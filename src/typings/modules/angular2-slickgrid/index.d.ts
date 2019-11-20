// Generated by typings
// Source: node_modules/angular2-slickgrid/out/js/gridsync.service.d.ts
declare module '~angular2-slickgrid/out/js/gridsync.service' {
import { Observable } from 'rxjs/Rx';
import { SelectionModel } from '~angular2-slickgrid/out/js/selectionModel';
export class GridSyncService {
    columnMinWidthPX: number;
    private _scrollLeftPX;
    private _scrollBarWidthPX;
    private _columnWidthPXs;
    private _rowNumberColumnWidthPX;
    private _updated;
    private _typeDropdownOffset;
    private _selectionModel;
    private _initialColumnWidthPXsOnResize;
    private _isGridReadOnly;
    initialColumnResize(): void;
    resizeColumn(index: number, deltaWidthPX: number): void;
    openTypeDropdown(columnIndex: number): void;
    private setColumnWidthPX(index, widthPX);
    underlyingSelectionModel: any;
    readonly updated: Observable<string>;
    readonly typeDropdownOffset: Observable<[number, number]>;
    scrollLeftPX: number;
    scrollBarWidthPX: number;
    columnWidthPXs: number[];
    rowNumberColumnWidthPX: number;
    readonly selectionModel: SelectionModel;
    isGridReadOnly: boolean;
    private notifyUpdates(propertyName);
}
}
declare module 'angular2-slickgrid/out/js/gridsync.service' {
export * from '~angular2-slickgrid/out/js/gridsync.service';
}

// Generated by typings
// Source: node_modules/angular2-slickgrid/out/js/interfaces.d.ts
declare module '~angular2-slickgrid/out/js/interfaces' {
import { Observable } from 'rxjs/Rx';
export enum NotificationType {
    Error = 0,
    UpdateAvailable = 1,
    UpdateDownloaded = 2,
}
export interface ISelectionRange {
    startRow: number;
    endRow: number;
    startColumn: number;
    endColumn: number;
}
export enum CollectionChange {
    ItemsReplaced = 0,
}
export interface IObservableCollection<T> {
    getLength(): number;
    at(index: number): T;
    getRange(start: number, end: number): T[];
    setCollectionChangedCallback(callback: (change: CollectionChange, startIndex: number, count: number) => void): void;
}
export class CancellationToken {
    private _isCanceled;
    private _canceled;
    cancel(): void;
    readonly isCanceled: boolean;
    readonly canceled: Observable<any>;
}
export enum FieldType {
    String = 0,
    Boolean = 1,
    Integer = 2,
    Decimal = 3,
    Date = 4,
    Unknown = 5,
}
export interface IColumnDefinition {
    id?: string;
    name: string;
    type: FieldType;
    asyncPostRender?: (cellRef: string, row: number, dataContext: JSON, colDef: any) => void;
    formatter?: (row: number, cell: any, value: any, columnDef: any, dataContext: any) => string;
    isEditable?: boolean;
}
export interface IGridColumnDefinition {
    id: string;
    type: number;
}
export interface IGridDataRow {
    row?: number;
    values: any[];
}
}
declare module 'angular2-slickgrid/out/js/interfaces' {
export * from '~angular2-slickgrid/out/js/interfaces';
}

// Generated by typings
// Source: node_modules/angular2-slickgrid/out/js/selectionModel.d.ts
declare module '~angular2-slickgrid/out/js/selectionModel' {
import { ISelectionRange } from '~angular2-slickgrid/out/js/interfaces';
export class SelectionModel implements ISlickSelectionModel {
    private _rowSelectionModel;
    private _handler;
    private _onSelectedRangesChanged;
    private _slickRangeFactory;
    constructor(_rowSelectionModel: ISlickSelectionModel, _handler: ISlickEventHandler, _onSelectedRangesChanged: ISlickEvent, _slickRangeFactory: (fromRow: number, fromCell: number, toRow: number, toCell: number) => ISlickRange);
    readonly range: ISlickRange[];
    readonly onSelectedRangesChanged: ISlickEvent;
    init(grid: ISlickGrid): void;
    destroy(): void;
    setSelectedRanges(ranges: ISlickRange[]): void;
    getSelectedRanges(): ISlickRange[];
    changeSelectedRanges(selections: ISelectionRange[]): void;
    toggleSingleColumnSelection(columnId: string): void;
    setSingleColumnSelection(columnId: string): void;
    toggleMultiColumnSelection(columnId: string): void;
    extendMultiColumnSelection(columnId: string): void;
    clearSelection(): void;
    private _grid;
    private _ranges;
    private _lastSelectedColumnIndexSequence;
    private static areRangesIdentical(lhs, rhs);
    private getColumnRange(columnId);
    private getColumnRangeByIndex(columnIndex);
    private readonly isColumnSelectionCurrently;
    private updateSelectedRanges(ranges);
}
export interface ISlickSelectionModel {
    range: ISlickRange[];
    onSelectedRangesChanged: any;
    init(grid: any): void;
    destroy(): void;
    setSelectedRanges(ranges: ISlickRange[]): void;
    getSelectedRanges(): ISlickRange[];
}
export interface ISlickEventHandler {
    subscribe(event: any, handler: any): void;
    unsubscribeAll(): void;
}
export interface ISlickEvent {
    notify(eventData: ISlickRange[]): void;
    subscribe(handler: (e: any, args: any) => void): void;
}
export interface ISlickRange {
    fromCell: number;
    fromRow: number;
    toCell: number;
    toRow: number;
}
export interface ISlickGrid {
    getActiveCellNode(): any;
    getCanvasNode(): any;
    resetActiveCell(): void;
    focus(): void;
    getColumnIndex(columnId: string): number;
    getDataLength(): number;
}
}
declare module 'angular2-slickgrid/out/js/selectionModel' {
export * from '~angular2-slickgrid/out/js/selectionModel';
}

// Generated by typings
// Source: node_modules/angular2-slickgrid/out/js/slickGrid.d.ts
declare module '~angular2-slickgrid/out/js/slickGrid' {
import { OnChanges, OnInit, OnDestroy, SimpleChange, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IObservableCollection, IGridDataRow, IColumnDefinition } from '~angular2-slickgrid/out/js/interfaces';
import { ISlickRange } from '~angular2-slickgrid/out/js/selectionModel';
export class SlickGrid implements OnChanges, OnInit, OnDestroy, AfterViewInit {
    private _el;
    private _gridSyncService;
    columnDefinitions: IColumnDefinition[];
    dataRows: IObservableCollection<IGridDataRow>;
    resized: Observable<any>;
    highlightedCells: {
        row: number;
        column: number;
    }[];
    blurredColumns: string[];
    contextColumns: string[];
    columnsLoading: string[];
    showHeader: boolean;
    showDataTypeIcon: boolean;
    enableColumnReorder: boolean;
    enableAsyncPostRender: boolean;
    selectionModel: string | Slick.SelectionModel<any, any>;
    plugins: Array<string | Slick.Plugin<any>>;
    enableEditing: boolean;
    topRowNumber: number;
    overrideCellFn: (rowNumber, columnId, value?, data?) => string;
    isColumnEditable: (column: number) => boolean;
    isCellEditValid: (row: number, column: number, newValue: any) => boolean;
    private _rowHeight;
    loadFinished: EventEmitter<void>;
    editingFinished: EventEmitter<any>;
    contextMenu: EventEmitter<any>;
    topRowNumberChange: EventEmitter<number>;
    activeCellChanged: EventEmitter<{
        row: number;
        column: number;
    }>;
    cellEditBegin: EventEmitter<{
        row: number;
        column: number;
    }>;
    cellEditExit: EventEmitter<{
        row: number;
        column: number;
        newValue: any;
    }>;
    rowEditBegin: EventEmitter<{
        row: number;
    }>;
    rowEditExit: EventEmitter<{
        row: number;
    }>;
    onFocus(): void;
    rowHeight: number;
    private _grid;
    private _gridColumns;
    private _columnNameToIndex;
    private _gridData;
    private _resizeSubscription;
    private _gridSyncSubscription;
    private _topRow;
    private _leftPx;
    private _activeEditingRow;
    private _activeEditingRowHasChanges;
    constructor(_el: any, _gridSyncService: any);
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    enterEditSession(): void;
    endEditSession(): void;
    readonly onSelectedRowsChanged: Slick.Event<Slick.OnSelectedRowsChangedEventArgs<any>>;
    getSelectedRows(): number[];
    getColumnIndex(name: string): number;
    getSelectedRanges(): ISlickRange[];
    registerPlugin(plugin: Slick.Plugin<any> | string): void;
    setActive(): void;
    selection: ISlickRange[] | boolean;
    subscribeToContextMenu(): void;
    private initGrid();
    private changeEditSession(enabled);
    private handleEditorCellChange(rowNumber);
    private static getDataWithSchema(data, columns);
    private onResize();
    private invalidateRange(start, end);
    private getColumnEditor;
    private getFormatter;
    private subscribeToScroll();
    private subscribeToCellChanged();
    private subscribeToBeforeEditCell();
    private subscribeToActiveCellChanged();
    private updateColumnWidths();
    private updateSchema();
    private getImagePathForDataType(type);
    private setCallbackOnDataRowsChanged();
    private renderGridDataRowsRange(startIndex, count);
}
}
declare module 'angular2-slickgrid/out/js/slickGrid' {
export * from '~angular2-slickgrid/out/js/slickGrid';
}

// Generated by typings
// Source: node_modules/angular2-slickgrid/out/js/virtualizedCollection.d.ts
declare module '~angular2-slickgrid/out/js/virtualizedCollection' {
import { IObservableCollection, CollectionChange } from '~angular2-slickgrid/out/js/interfaces';
export class VirtualizedCollection<TData> implements IObservableCollection<TData> {
    private _placeHolderGenerator;
    private _length;
    private _windowSize;
    private _bufferWindowBefore;
    private _window;
    private _bufferWindowAfter;
    private collectionChangedCallback;
    constructor(windowSize: number, length: number, loadFn: (offset: number, count: number) => Promise<TData[]>, _placeHolderGenerator: (index: number) => TData);
    setCollectionChangedCallback(callback: (change: CollectionChange, startIndex: number, count: number) => void): void;
    getLength(): number;
    at(index: number): TData;
    getRange(start: number, end: number): TData[];
    private getRangeFromCurrent(start, end);
    private getDataFromCurrent(index);
    private resetWindowsAroundIndex(index);
}
}
declare module 'angular2-slickgrid/out/js/virtualizedCollection' {
export * from '~angular2-slickgrid/out/js/virtualizedCollection';
}

// Generated by typings
// Source: node_modules/angular2-slickgrid/out/index.d.ts
declare module '~angular2-slickgrid/out/index' {
export * from '~angular2-slickgrid/out/js/gridsync.service';
export * from '~angular2-slickgrid/out/js/interfaces';
export * from '~angular2-slickgrid/out/js/selectionModel';
export * from '~angular2-slickgrid/out/js/slickGrid';
export * from '~angular2-slickgrid/out/js/virtualizedCollection';
}
declare module 'angular2-slickgrid/out/index' {
export * from '~angular2-slickgrid/out/index';
}
declare module 'angular2-slickgrid' {
export * from '~angular2-slickgrid/out/index';
}