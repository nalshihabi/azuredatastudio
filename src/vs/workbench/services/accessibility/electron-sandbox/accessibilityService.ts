/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IAccessibilityService, AccessibilitySupport } from 'vs/platform/accessibility/common/accessibility';
import { isWindows, isLinux } from 'vs/base/common/platform';
import { IWorkbenchEnvironmentService } from 'vs/workbench/services/environment/common/environmentService';
import { INativeWorkbenchEnvironmentService } from 'vs/workbench/services/environment/electron-sandbox/environmentService';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { Registry } from 'vs/platform/registry/common/platform';
import { AccessibilityService } from 'vs/platform/accessibility/common/accessibilityService';
import { registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IJSONEditingService } from 'vs/workbench/services/configuration/common/jsonEditing';
import { IWorkbenchContribution, IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from 'vs/workbench/common/contributions';
import { LifecyclePhase } from 'vs/platform/lifecycle/common/lifecycle';

interface AccessibilityMetrics {
	enabled: boolean;
}
type AccessibilityMetricsClassification = {
	enabled: { classification: 'SystemMetaData', purpose: 'FeatureInsight' };
};

export class NativeAccessibilityService extends AccessibilityService implements IAccessibilityService {

	declare readonly _serviceBrand: undefined;

	private didSendTelemetry = false;

	constructor(
		@IWorkbenchEnvironmentService environmentService: INativeWorkbenchEnvironmentService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IConfigurationService configurationService: IConfigurationService,
		@ITelemetryService private readonly _telemetryService: ITelemetryService
	) {
		super(contextKeyService, configurationService);
		this.setAccessibilitySupport(environmentService.configuration.accessibilitySupport ? AccessibilitySupport.Enabled : AccessibilitySupport.Disabled);
	}

	async alwaysUnderlineAccessKeys(): Promise<boolean> {
		if (!isWindows) {
			return false;
		}

		const Registry = await import('vscode-windows-registry');

		let value: string | undefined = undefined;
		try {
			value = Registry.GetStringRegKey('HKEY_CURRENT_USER', 'Control Panel\\Accessibility\\Keyboard Preference', 'On');
		} catch {
			return false;
		}

		return value === '1';
	}

	setAccessibilitySupport(accessibilitySupport: AccessibilitySupport): void {
		super.setAccessibilitySupport(accessibilitySupport);

		if (!this.didSendTelemetry && accessibilitySupport === AccessibilitySupport.Enabled) {
			this._telemetryService.publicLog2<AccessibilityMetrics, AccessibilityMetricsClassification>('accessibility', { enabled: true });
			this.didSendTelemetry = true;
		}
	}
}

registerSingleton(IAccessibilityService, NativeAccessibilityService, true);

// On linux we do not automatically detect that a screen reader is detected, thus we have to implicitly notify the renderer to enable accessibility when user configures it in settings
class LinuxAccessibilityContribution implements IWorkbenchContribution {
	constructor(
		@IJSONEditingService jsonEditingService: IJSONEditingService,
		@IAccessibilityService accessibilityService: IAccessibilityService,
		@IWorkbenchEnvironmentService environmentService: IWorkbenchEnvironmentService
	) {
		const forceRendererAccessibility = () => {
			if (accessibilityService.isScreenReaderOptimized()) {
				jsonEditingService.write(environmentService.argvResource, [{ path: ['force-renderer-accessibility'], value: true }], true);
			}
		};
		forceRendererAccessibility();
		accessibilityService.onDidChangeScreenReaderOptimized(forceRendererAccessibility);
	}
}

if (isLinux) {
	Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench).registerWorkbenchContribution(LinuxAccessibilityContribution, LifecyclePhase.Ready);
}
