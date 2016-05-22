declare module monaco.editor {

    export function create(domElement: HTMLElement, options: IEditorConstructionOptions, services?: any): ICodeEditor;
    export function createDiffEditor(domElement: HTMLElement, options: IDiffEditorConstructionOptions, services?: any): IDiffEditor;
    export function createModel(value: string, mode: string | ILanguage | IMode, associatedResource?: any | string): IModel;
    export function getOrCreateMode(modeId: string): TPromise<IMode>;
    export function createCustomMode(description: ILanguage): TPromise<IMode>;
    export function colorize(text: string, modeId: string, options: IColorizerOptions): TPromise<string>;
    export function colorizeElement(domNode: HTMLElement, options: IColorizerElementOptions): TPromise<void>;
    export function colorizeLine(line: string, tokens: ViewLineToken[], tabSize?: number): string;
    export function colorizeModelLine(model: IModel, lineNumber: number, tabSize?: number): string;
    export function registerWorkerParticipant(modeId: string, moduleName: string, ctorName: string): void;
    export function configureMode(modeId: string, options: any): void;

    export interface IColorizerOptions {
        tabSize?: number;
    }

    export interface IColorizerElementOptions extends IColorizerOptions {
        theme?: string;
        mimeType?: string;
    }

    export interface IEditorConstructionOptions extends ICodeEditorWidgetCreationOptions {
        value?: string;
        /**
         * A mode name (such as text/javascript, etc.) or an IMonarchLanguage
         */
        mode?: any;
        enableTelemetry?: boolean;
    }

    export interface IDiffEditorConstructionOptions extends IDiffEditorOptions {
    }
}

declare module monaco {

    interface Thenable<R> {
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;
        then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
    }

    export interface IDisposable {
        dispose(): void;
    }

    export interface IEvent<T> {
        (listener: (e: T) => any, thisArg?: any): IDisposable;
    }

    export class Emitter<T> {
        constructor();
        event: IEvent<T>;
        fire(event?: T): void;
        dispose(): void;
    }



    // --- Generic promise
    export interface TValueCallback<T> {
        (value: T): void;
    }


    export interface ProgressCallback {
        (progress: any): any;
    }


    export class TPromise<V> {

        constructor(init: (complete: TValueCallback<V>, error: (err: any) => void, progress: ProgressCallback) => void, oncancel?: any);

        public then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => TPromise<U>, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => TPromise<U> | U, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => U, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => void, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U> | U, error?: (err: any) => TPromise<U>, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U> | U, error?: (err: any) => TPromise<U> | U, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U> | U, error?: (err: any) => U, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U> | U, error?: (err: any) => void, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => U, error?: (err: any) => TPromise<U>, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => U, error?: (err: any) => TPromise<U> | U, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => U, error?: (err: any) => U, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => U, error?: (err: any) => void, progress?: ProgressCallback): TPromise<U>;

        public done(success?: (value: V) => void, error?: (err: any) => any, progress?: ProgressCallback): void;
        public cancel(): void;

        public static as<ValueType>(value: ValueType): TPromise<ValueType>;
        public static is(value: any): value is TPromise<any>;
        public static timeout(delay: number): TPromise<void>;
        public static join<ValueType>(promises: TPromise<ValueType>[]): TPromise<ValueType[]>;
        public static join<ValueType>(promises: Thenable<ValueType>[]): Thenable<ValueType[]>;
        public static join<ValueType>(promises: { [n: string]: TPromise<ValueType> }): TPromise<{ [n: string]: ValueType }>;
        public static any<ValueType>(promises: TPromise<ValueType>[]): TPromise<{ key: string; value: TPromise<ValueType>; }>;
        public static wrapError<ValueType>(error: any): TPromise<ValueType>;
    }

    /**
     * Uniform Resource Identifier (Uri) http://tools.ietf.org/html/rfc3986.
     * This class is a simple parser which creates the basic component paths
     * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
     * and encoding.
     *
     *       foo://example.com:8042/over/there?name=ferret#nose
     *       \_/   \______________/\_________/ \_________/ \__/
     *        |           |            |            |        |
     *     scheme     authority       path        query   fragment
     *        |   _____________________|__
     *       / \ /                        \
     *       urn:example:animal:ferret:nose
     *
     *
     */
    export class Uri {
        private static _empty;
        private static _slash;
        private static _regexp;
        private static _driveLetterPath;
        private static _upperCaseDrive;
        private _scheme;
        private _authority;
        private _path;
        private _query;
        private _fragment;
        private _formatted;
        private _fsPath;
        constructor();
        /**
         * scheme is the 'http' part of 'http://www.msft.com/some/path?query#fragment'.
         * The part before the first colon.
         */
        scheme: string;
        /**
         * authority is the 'www.msft.com' part of 'http://www.msft.com/some/path?query#fragment'.
         * The part between the first double slashes and the next slash.
         */
        authority: string;
        /**
         * path is the '/some/path' part of 'http://www.msft.com/some/path?query#fragment'.
         */
        path: string;
        /**
         * query is the 'query' part of 'http://www.msft.com/some/path?query#fragment'.
         */
        query: string;
        /**
         * fragment is the 'fragment' part of 'http://www.msft.com/some/path?query#fragment'.
         */
        fragment: string;
        /**
         * Returns a string representing the corresponding file system path of this Uri.
         * Will handle UNC paths and normalize windows drive letters to lower-case. Also
         * uses the platform specific path separator. Will *not* validate the path for
         * invalid characters and semantics. Will *not* look at the scheme of this Uri.
         */
        fsPath: string;
        with(scheme: string, authority: string, path: string, query: string, fragment: string): Uri;
        withScheme(value: string): Uri;
        withAuthority(value: string): Uri;
        withPath(value: string): Uri;
        withQuery(value: string): Uri;
        withFragment(value: string): Uri;
        static parse(value: string): Uri;
        static file(path: string): Uri;
        private static _parseComponents(value);
        static create(scheme?: string, authority?: string, path?: string, query?: string, fragment?: string): Uri;
        private static _validate(ret);
        /**
         *
         * @param skipEncoding Do not encode the result, default is `false`
         */
        toString(skipEncoding?: boolean): string;
        private static _asFormatted(uri, skipEncoding);
        toJSON(): any;
        static revive(data: any): Uri;
    }

    export interface IEmitterEvent {
        getType(): string;
        getData(): any;
    }

    export interface ListenerCallback {
        (value: any): void;
    }

    export interface IBulkListenerCallback {
        (value: IEmitterEvent[]): void;
    }

    export interface ListenerUnbind {
        (): void;
    }

    export interface IEventEmitter extends IDisposable {
        addListener(eventType: string, listener: ListenerCallback): ListenerUnbind;
        addListener2(eventType: string, listener: ListenerCallback): IDisposable;
        addOneTimeListener(eventType: string, listener: ListenerCallback): ListenerUnbind;
        addBulkListener(listener: IBulkListenerCallback): ListenerUnbind;
        addBulkListener2(listener: IBulkListenerCallback): IDisposable;
        addEmitter(eventEmitter: IEventEmitter, emitterType?: string): ListenerUnbind;
        addEmitter2(eventEmitter: IEventEmitter, emitterType?: string): IDisposable;
        addEmitterTypeListener(eventType: string, emitterType: string, listener: ListenerCallback): ListenerUnbind;
        emit(eventType: string, data?: any): void;
    }


    /**
     * Virtual Key Codes, the value does not hold any inherent meaning.
     * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
     * But these are "more general", as they should work across browsers & OS`s.
     */
    export enum KeyCode {
        /**
         * Placed first to cover the 0 value of the enum.
         */
        Unknown = 0,
        Backspace = 1,
        Tab = 2,
        Enter = 3,
        Shift = 4,
        Ctrl = 5,
        Alt = 6,
        PauseBreak = 7,
        CapsLock = 8,
        Escape = 9,
        Space = 10,
        PageUp = 11,
        PageDown = 12,
        End = 13,
        Home = 14,
        LeftArrow = 15,
        UpArrow = 16,
        RightArrow = 17,
        DownArrow = 18,
        Insert = 19,
        Delete = 20,
        KEY_0 = 21,
        KEY_1 = 22,
        KEY_2 = 23,
        KEY_3 = 24,
        KEY_4 = 25,
        KEY_5 = 26,
        KEY_6 = 27,
        KEY_7 = 28,
        KEY_8 = 29,
        KEY_9 = 30,
        KEY_A = 31,
        KEY_B = 32,
        KEY_C = 33,
        KEY_D = 34,
        KEY_E = 35,
        KEY_F = 36,
        KEY_G = 37,
        KEY_H = 38,
        KEY_I = 39,
        KEY_J = 40,
        KEY_K = 41,
        KEY_L = 42,
        KEY_M = 43,
        KEY_N = 44,
        KEY_O = 45,
        KEY_P = 46,
        KEY_Q = 47,
        KEY_R = 48,
        KEY_S = 49,
        KEY_T = 50,
        KEY_U = 51,
        KEY_V = 52,
        KEY_W = 53,
        KEY_X = 54,
        KEY_Y = 55,
        KEY_Z = 56,
        Meta = 57,
        ContextMenu = 58,
        F1 = 59,
        F2 = 60,
        F3 = 61,
        F4 = 62,
        F5 = 63,
        F6 = 64,
        F7 = 65,
        F8 = 66,
        F9 = 67,
        F10 = 68,
        F11 = 69,
        F12 = 70,
        F13 = 71,
        F14 = 72,
        F15 = 73,
        F16 = 74,
        F17 = 75,
        F18 = 76,
        F19 = 77,
        NumLock = 78,
        ScrollLock = 79,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the ';:' key
         */
        US_SEMICOLON = 80,
        /**
         * For any country/region, the '+' key
         * For the US standard keyboard, the '=+' key
         */
        US_EQUAL = 81,
        /**
         * For any country/region, the ',' key
         * For the US standard keyboard, the ',<' key
         */
        US_COMMA = 82,
        /**
         * For any country/region, the '-' key
         * For the US standard keyboard, the '-_' key
         */
        US_MINUS = 83,
        /**
         * For any country/region, the '.' key
         * For the US standard keyboard, the '.>' key
         */
        US_DOT = 84,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '/?' key
         */
        US_SLASH = 85,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '`~' key
         */
        US_BACKTICK = 86,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '[{' key
         */
        US_OPEN_SQUARE_BRACKET = 87,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '\|' key
         */
        US_BACKSLASH = 88,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the ']}' key
         */
        US_CLOSE_SQUARE_BRACKET = 89,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the ''"' key
         */
        US_QUOTE = 90,
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         */
        OEM_8 = 91,
        /**
         * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
         */
        OEM_102 = 92,
        NUMPAD_0 = 93,
        NUMPAD_1 = 94,
        NUMPAD_2 = 95,
        NUMPAD_3 = 96,
        NUMPAD_4 = 97,
        NUMPAD_5 = 98,
        NUMPAD_6 = 99,
        NUMPAD_7 = 100,
        NUMPAD_8 = 101,
        NUMPAD_9 = 102,
        NUMPAD_MULTIPLY = 103,
        NUMPAD_ADD = 104,
        NUMPAD_SEPARATOR = 105,
        NUMPAD_SUBTRACT = 106,
        NUMPAD_DECIMAL = 107,
        NUMPAD_DIVIDE = 108,
        /**
         * Placed last to cover the length of the enum.
         */
        MAX_VALUE = 109,
    }

    export class KeyMod {
        static CtrlCmd: number;
        static Shift: number;
        static Alt: number;
        static WinCtrl: number;
        static chord(firstPart: number, secondPart: number): number;
    }

    export interface IHTMLContentElementCode {
        language: string;
        value: string;
    }

    export interface IHTMLContentElement {
        /**
         * supports **bold**, __italics__, and [[actions]]
         */
        formattedText?: string;
        text?: string;
        className?: string;
        style?: string;
        customStyle?: any;
        tagName?: string;
        children?: IHTMLContentElement[];
        isText?: boolean;
        role?: string;
        markdown?: string;
        code?: IHTMLContentElementCode;
    }


    export interface IAction extends IDisposable {
        id: string;
        label: string;
        tooltip: string;
        class: string;
        enabled: boolean;
        checked: boolean;
        run(event?: any): TPromise<any>;
    }


    export interface IKeyboardEvent {
        browserEvent: Event;
        target: HTMLElement;
        ctrlKey: boolean;
        shiftKey: boolean;
        altKey: boolean;
        metaKey: boolean;
        keyCode: KeyCode;
        clone(): IKeyboardEvent;
        asKeybinding(): number;
        equals(keybinding: number): boolean;
        preventDefault(): void;
        stopPropagation(): void;
    }

    export interface IMouseEvent {
        browserEvent: MouseEvent;
        leftButton: boolean;
        middleButton: boolean;
        rightButton: boolean;
        target: HTMLElement;
        detail: number;
        posx: number;
        posy: number;
        ctrlKey: boolean;
        shiftKey: boolean;
        altKey: boolean;
        metaKey: boolean;
        timestamp: number;
        preventDefault(): void;
        stopPropagation(): void;
    }

    export interface IPlatformServices {
    }

    export interface IInstantiationService {
    }

    export interface IConstructorSignature1<A1, T> {
        new (context: IPlatformServices, first: A1): T;
    }

    export interface IConstructorSignature2<A1, A2, T> {
        new (context: IPlatformServices, first: A1, second: A2): T;
    }
}


declare module monaco.editor {

    /**
     * A Monarch language definition
     */
    export interface ILanguage {
        /**
         * unique name to identify the language.
         */
        name: string;
        /**
         * map from string to ILanguageRule[]
         */
        tokenizer: Object;
        /**
         * nice display name
         */
        displayName?: string;
        /**
         * is the language case insensitive?
         */
        ignoreCase?: boolean;
        /**
         * used to insert/delete line comments in the editor
         */
        lineComment?: string;
        /**
         * used to insert/delete block comments in the editor
         */
        blockCommentStart?: string;
        /**
         * used to insert/delete block comments in the editor
         */
        blockCommentEnd?: string;
        /**
         * if no match in the tokenizer assign this token class (default 'source')
         */
        defaultToken?: string;
        /**
         * for example [['{','}','delimiter.curly']]
         */
        brackets?: ILanguageBracket[];
        /**
         * start symbol in the tokenizer (by default the first entry is used)
         */
        start?: string;
        /**
         * attach this to every token class (by default '.' + name)
         */
        tokenPostfix?: string;
        /**
         * for example [['"','"']]
         */
        autoClosingPairs?: string[][];
        /**
         * word definition regular expression
         */
        wordDefinition?: RegExp;
        /**
         * characters that could potentially cause outdentation
         */
        outdentTriggers?: string;
    }

    /**
     * This interface can be shortened as an array, ie. ['{','}','delimiter.curly']
     */
    export interface ILanguageBracket {
        /**
         * open bracket
         */
        open: string;
        /**
         * closeing bracket
         */
        close: string;
        /**
         * token class
         */
        token: string;
    }


    export class ModeTransition {
        _modeTransitionBrand: void;
        startIndex: number;
        mode: IMode;
        constructor(startIndex: number, mode: IMode);
        static findIndexInSegmentsArray(arr: ModeTransition[], desiredIndex: number): number;
        static create(modeTransitions: IModeTransition[]): ModeTransition[];
    }


    /**
     * Interface used for tokenization
     */
    export interface IToken {
        startIndex: number;
        type: string;
    }

    export interface IModeTransition {
        startIndex: number;
        mode: IMode;
    }

    export interface ILineContext {
        getLineContent(): string;
        modeTransitions: ModeTransition[];
        getTokenCount(): number;
        getTokenStartIndex(tokenIndex: number): number;
        getTokenType(tokenIndex: number): string;
        getTokenText(tokenIndex: number): string;
        getTokenEndIndex(tokenIndex: number): number;
        findIndexOfOffset(offset: number): number;
    }

    export interface IMode {

    }

    export enum ScrollbarVisibility {
        Auto = 1,
        Hidden = 2,
        Visible = 3,
    }

    /**
     * A token on a line.
     */
    export class ViewLineToken {
        _viewLineTokenBrand: void;
        startIndex: number;
        type: string;
        constructor(startIndex: number, type: string);
        equals(other: ViewLineToken): boolean;
        static findIndexInSegmentsArray(arr: ViewLineToken[], desiredIndex: number): number;
        static equalsArray(a: ViewLineToken[], b: ViewLineToken[]): boolean;
    }


    /**
     * A position in the editor. This interface is suitable for serialization.
     */
    export interface IPosition {
        /**
         * line number (starts at 1)
         */
        lineNumber: number;
        /**
         * column (the first character in a line is between column 1 and column 2)
         */
        column: number;
    }

    /**
     * A position in the editor.
     */
    export interface IEditorPosition extends IPosition {
        /**
         * Test if this position equals other position
         */
        equals(other: IPosition): boolean;
        /**
         * Test if this position is before other position. If the two positions are equal, the result will be false.
         */
        isBefore(other: IPosition): boolean;
        /**
         * Test if this position is before other position. If the two positions are equal, the result will be true.
         */
        isBeforeOrEqual(other: IPosition): boolean;
        /**
         * Clone this position.
         */
        clone(): IEditorPosition;
    }

    /**
     * A range in the editor. This interface is suitable for serialization.
     */
    export interface IRange {
        /**
         * Line number on which the range starts (starts at 1).
         */
        startLineNumber: number;
        /**
         * Column on which the range starts in line `startLineNumber` (starts at 1).
         */
        startColumn: number;
        /**
         * Line number on which the range ends.
         */
        endLineNumber: number;
        /**
         * Column on which the range ends in line `endLineNumber`.
         */
        endColumn: number;
    }

    /**
     * A range in the editor.
     */
    export interface IEditorRange extends IRange {
        /**
         * Test if this range is empty.
         */
        isEmpty(): boolean;
        collapseToStart(): IEditorRange;
        /**
         * Test if position is in this range. If the position is at the edges, will return true.
         */
        containsPosition(position: IPosition): boolean;
        /**
         * Test if range is in this range. If the range is equal to this range, will return true.
         */
        containsRange(range: IRange): boolean;
        /**
         * A reunion of the two ranges. The smallest position will be used as the start point, and the largest one as the end point.
         */
        plusRange(range: IRange): IEditorRange;
        /**
         * A intersection of the two ranges.
         */
        intersectRanges(range: IRange): IEditorRange;
        /**
         * Test if this range equals other.
         */
        equalsRange(other: IRange): boolean;
        /**
         * Return the end position (which will be after or equal to the start position)
         */
        getEndPosition(): IEditorPosition;
        /**
         * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
         */
        setEndPosition(endLineNumber: number, endColumn: number): IEditorRange;
        /**
         * Return the start position (which will be before or equal to the end position)
         */
        getStartPosition(): IEditorPosition;
        /**
         * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
         */
        setStartPosition(startLineNumber: number, startColumn: number): IEditorRange;
        /**
         * Clone this range.
         */
        cloneRange(): IEditorRange;
        /**
         * Transform to a user presentable string representation.
         */
        toString(): string;
    }

    /**
     * A selection in the editor.
     * The selection is a range that has an orientation.
     */
    export interface ISelection {
        /**
         * The line number on which the selection has started.
         */
        selectionStartLineNumber: number;
        /**
         * The column on `selectionStartLineNumber` where the selection has started.
         */
        selectionStartColumn: number;
        /**
         * The line number on which the selection has ended.
         */
        positionLineNumber: number;
        /**
         * The column on `positionLineNumber` where the selection has ended.
         */
        positionColumn: number;
    }

    /**
     * The direction of a selection.
     */
    export enum SelectionDirection {
        /**
         * The selection starts above where it ends.
         */
        LTR = 0,
        /**
         * The selection starts below where it ends.
         */
        RTL = 1,
    }

    /**
     * A selection in the editor.
     */
    export interface IEditorSelection extends ISelection, IEditorRange {
        /**
         * Test if equals other selection.
         */
        equalsSelection(other: ISelection): boolean;
        /**
         * Clone this selection.
         */
        clone(): IEditorSelection;
        /**
         * Get directions (LTR or RTL).
         */
        getDirection(): SelectionDirection;
        /**
         * Create a new selection with a different `positionLineNumber` and `positionColumn`.
         */
        setEndPosition(endLineNumber: number, endColumn: number): IEditorSelection;
        /**
         * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
         */
        setStartPosition(startLineNumber: number, startColumn: number): IEditorSelection;
    }

    /**
     * Configuration options for editor scrollbars
     */
    export interface IEditorScrollbarOptions {
        /**
         * The size of arrows (if displayed).
         * Defaults to 11.
         */
        arrowSize?: number;
        /**
         * Render vertical scrollbar.
         * Accepted values: 'auto', 'visible', 'hidden'.
         * Defaults to 'auto'.
         */
        vertical?: string;
        /**
         * Render horizontal scrollbar.
         * Accepted values: 'auto', 'visible', 'hidden'.
         * Defaults to 'auto'.
         */
        horizontal?: string;
        /**
         * Cast horizontal and vertical shadows when the content is scrolled.
         * Defaults to false.
         */
        useShadows?: boolean;
        /**
         * Render arrows at the top and bottom of the vertical scrollbar.
         * Defaults to false.
         */
        verticalHasArrows?: boolean;
        /**
         * Render arrows at the left and right of the horizontal scrollbar.
         * Defaults to false.
         */
        horizontalHasArrows?: boolean;
        /**
         * Listen to mouse wheel events and react to them by scrolling.
         * Defaults to true.
         */
        handleMouseWheel?: boolean;
        /**
         * Height in pixels for the horizontal scrollbar.
         * Defaults to 10 (px).
         */
        horizontalScrollbarSize?: number;
        /**
         * Width in pixels for the vertical scrollbar.
         * Defaults to 10 (px).
         */
        verticalScrollbarSize?: number;
        verticalSliderSize?: number;
        horizontalSliderSize?: number;
    }

    export enum WrappingIndent {
        None = 0,
        Same = 1,
        Indent = 2,
    }

    /**
     * Configuration options for the editor.
     */
    export interface IEditorOptions {
        experimentalScreenReader?: boolean;
        ariaLabel?: string;
        /**
         * Render vertical lines at the specified columns.
         * Defaults to empty array.
         */
        rulers?: number[];
        /**
         * A string containing the word separators used when doing word navigation.
         * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
         */
        wordSeparators?: string;
        /**
         * Enable Linux primary clipboard.
         * Defaults to true.
         */
        selectionClipboard?: boolean;
        /**
         * Control the rendering of line numbers.
         * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
         * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
         * Otherwise, line numbers will not be rendered.
         * Defaults to true.
         */
        lineNumbers?: any;
        /**
         * Should the corresponding line be selected when clicking on the line number?
         * Defaults to true.
         */
        selectOnLineNumbers?: boolean;
        /**
         * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
         * Defaults to 5.
         */
        lineNumbersMinChars?: number;
        /**
         * Enable the rendering of the glyph margin.
         * Defaults to false.
         */
        glyphMargin?: boolean;
        /**
         * The width reserved for line decorations (in px).
         * Line decorations are placed between line numbers and the editor content.
         * Defaults to 10.
         */
        lineDecorationsWidth?: number;
        /**
         * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
         * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
         * Defaults to 30 (px).
         */
        revealHorizontalRightPadding?: number;
        /**
         * Render the editor selection with rounded borders.
         * Defaults to true.
         */
        roundedSelection?: boolean;
        /**
         * Theme to be used for rendering. Consists of two parts, the UI theme and the syntax theme,
         * separated by a space.
         * The current available UI themes are: 'vs' (default), 'vs-dark', 'hc-black'
         * The syntax themes are contributed. The default is 'default-theme'
         */
        theme?: string;
        /**
         * Should the editor be read only.
         * Defaults to false.
         */
        readOnly?: boolean;
        /**
         * Control the behavior and rendering of the scrollbars.
         */
        scrollbar?: IEditorScrollbarOptions;
        /**
         * The number of vertical lanes the overview ruler should render.
         * Defaults to 2.
         */
        overviewRulerLanes?: number;
        /**
         * Control the cursor blinking animation.
         * Defaults to 'blink'.
         */
        cursorBlinking?: string;
        /**
         * Control the cursor style, either 'block' or 'line'.
         * Defaults to 'line'.
         */
        cursorStyle?: string;
        /**
         * Enable font ligatures.
         * Defaults to false.
         */
        fontLigatures?: boolean;
        /**
         * Should the cursor be hidden in the overview ruler.
         * Defaults to false.
         */
        hideCursorInOverviewRuler?: boolean;
        /**
         * Enable that scrolling can go one screen size after the last line.
         * Defaults to true.
         */
        scrollBeyondLastLine?: boolean;
        /**
         * Enable that the editor will install an interval to check if its container dom node size has changed.
         * Enabling this might have a severe performance impact.
         * Defaults to false.
         */
        automaticLayout?: boolean;
        /**
         * Control the wrapping strategy of the editor.
         * Using -1 means no wrapping whatsoever.
         * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
         * Using a positive number means wrapping after a fixed number of characters.
         * Defaults to 300.
         */
        wrappingColumn?: number;
        /**
         * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
         * Defaults to 'none'.
         */
        wrappingIndent?: string;
        /**
         * Configure word wrapping characters. A break will be introduced before these characters.
         * Defaults to '{([+'.
         */
        wordWrapBreakBeforeCharacters?: string;
        /**
         * Configure word wrapping characters. A break will be introduced after these characters.
         * Defaults to ' \t})]?|&,;'.
         */
        wordWrapBreakAfterCharacters?: string;
        /**
         * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
         * Defaults to '.'.
         */
        wordWrapBreakObtrusiveCharacters?: string;
        /**
         * Control what pressing Tab does.
         * If it is false, pressing Tab or Shift-Tab will be handled by the editor.
         * If it is true, pressing Tab or Shift-Tab will move the browser focus.
         * Defaults to false.
         */
        tabFocusMode?: boolean;
        /**
         * Performance guard: Stop rendering a line after x characters.
         * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is >= 0.
         * Use -1 to never stop rendering
         */
        stopRenderingLineAfter?: number;
        /**
         * Enable hover.
         * Defaults to true.
         */
        hover?: boolean;
        /**
         * Enable custom contextmenu.
         * Defaults to true.
         */
        contextmenu?: boolean;
        /**
         * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
         * Defaults to 1.
         */
        mouseWheelScrollSensitivity?: number;
        /**
         * Enable quick suggestions (shaddow suggestions)
         * Defaults to true.
         */
        quickSuggestions?: boolean;
        /**
         * Quick suggestions show delay (in ms)
         * Defaults to 500 (ms)
         */
        quickSuggestionsDelay?: number;
        /**
         * Render icons in suggestions box.
         * Defaults to true.
         */
        iconsInSuggestions?: boolean;
        /**
         * Enable auto closing brackets.
         * Defaults to true.
         */
        autoClosingBrackets?: boolean;
        /**
         * Enable format on type.
         * Defaults to false.
         */
        formatOnType?: boolean;
        /**
         * Enable the suggestion box to pop-up on trigger characters.
         * Defaults to true.
         */
        suggestOnTriggerCharacters?: boolean;
        /**
         * Accept suggestions on ENTER.
         * Defaults to true.
         */
        acceptSuggestionOnEnter?: boolean;
        /**
         * Enable selection highlight.
         * Defaults to true.
         */
        selectionHighlight?: boolean;
        /**
         * Show lines before classes and methods (based on outline info).
         * Defaults to false.
         */
        outlineMarkers?: boolean;
        /**
         * Show reference infos (a.k.a. code lenses) for modes that support it
         * Defaults to true.
         */
        referenceInfos?: boolean;
        /**
         * Enable code folding
         * Defaults to true.
         */
        folding?: boolean;
        /**
         * Enable rendering of leading whitespace.
         * Defaults to false.
         */
        renderWhitespace?: boolean;
        /**
         * Enable rendering of indent guides.
         * Defaults to true.
         */
        indentGuides?: boolean;
        /**
         * Inserting and deleting whitespace follows tab stops.
         */
        useTabStops?: boolean;
        /**
         * The font family
         */
        fontFamily?: string;
        /**
         * The font size
         */
        fontSize?: number;
        /**
         * The line height
         */
        lineHeight?: number;
    }

    /**
     * Configuration options for the diff editor.
     */
    export interface IDiffEditorOptions extends IEditorOptions {
        /**
         * Allow the user to resize the diff editor split view.
         * Defaults to true.
         */
        enableSplitViewResizing?: boolean;
        /**
         * Render the differences in two side-by-side editors.
         * Defaults to true.
         */
        renderSideBySide?: boolean;
        /**
         * Compute the diff by ignoring leading/trailing whitespace
         * Defaults to true.
         */
        ignoreTrimWhitespace?: boolean;
        /**
         * Original model should be editable?
         * Defaults to false.
         */
        originalEditable?: boolean;
    }

    export class InternalEditorScrollbarOptions {
        _internalEditorScrollbarOptionsBrand: void;
        arrowSize: number;
        vertical: ScrollbarVisibility;
        horizontal: ScrollbarVisibility;
        useShadows: boolean;
        verticalHasArrows: boolean;
        horizontalHasArrows: boolean;
        handleMouseWheel: boolean;
        horizontalScrollbarSize: number;
        horizontalSliderSize: number;
        verticalScrollbarSize: number;
        verticalSliderSize: number;
        mouseWheelScrollSensitivity: number;
        constructor(source: {
            arrowSize: number;
            vertical: ScrollbarVisibility;
            horizontal: ScrollbarVisibility;
            useShadows: boolean;
            verticalHasArrows: boolean;
            horizontalHasArrows: boolean;
            handleMouseWheel: boolean;
            horizontalScrollbarSize: number;
            horizontalSliderSize: number;
            verticalScrollbarSize: number;
            verticalSliderSize: number;
            mouseWheelScrollSensitivity: number;
        });
        equals(other: InternalEditorScrollbarOptions): boolean;
        clone(): InternalEditorScrollbarOptions;
    }

    export class EditorWrappingInfo {
        _editorWrappingInfoBrand: void;
        isViewportWrapping: boolean;
        wrappingColumn: number;
        wrappingIndent: WrappingIndent;
        wordWrapBreakBeforeCharacters: string;
        wordWrapBreakAfterCharacters: string;
        wordWrapBreakObtrusiveCharacters: string;
        constructor(source: {
            isViewportWrapping: boolean;
            wrappingColumn: number;
            wrappingIndent: WrappingIndent;
            wordWrapBreakBeforeCharacters: string;
            wordWrapBreakAfterCharacters: string;
            wordWrapBreakObtrusiveCharacters: string;
        });
        equals(other: EditorWrappingInfo): boolean;
        clone(): EditorWrappingInfo;
    }

    export class InternalEditorViewOptions {
        _internalEditorViewOptionsBrand: void;
        theme: string;
        canUseTranslate3d: boolean;
        experimentalScreenReader: boolean;
        rulers: number[];
        ariaLabel: string;
        lineNumbers: any;
        selectOnLineNumbers: boolean;
        glyphMargin: boolean;
        revealHorizontalRightPadding: number;
        roundedSelection: boolean;
        overviewRulerLanes: number;
        cursorBlinking: string;
        cursorStyle: TextEditorCursorStyle;
        hideCursorInOverviewRuler: boolean;
        scrollBeyondLastLine: boolean;
        editorClassName: string;
        stopRenderingLineAfter: number;
        renderWhitespace: boolean;
        indentGuides: boolean;
        scrollbar: InternalEditorScrollbarOptions;
        constructor(source: {
            theme: string;
            canUseTranslate3d: boolean;
            experimentalScreenReader: boolean;
            rulers: number[];
            ariaLabel: string;
            lineNumbers: any;
            selectOnLineNumbers: boolean;
            glyphMargin: boolean;
            revealHorizontalRightPadding: number;
            roundedSelection: boolean;
            overviewRulerLanes: number;
            cursorBlinking: string;
            cursorStyle: TextEditorCursorStyle;
            hideCursorInOverviewRuler: boolean;
            scrollBeyondLastLine: boolean;
            editorClassName: string;
            stopRenderingLineAfter: number;
            renderWhitespace: boolean;
            indentGuides: boolean;
            scrollbar: InternalEditorScrollbarOptions;
        });
        private static _toSortedIntegerArray(source);
        private static _numberArraysEqual(a, b);
        equals(other: InternalEditorViewOptions): boolean;
        createChangeEvent(newOpts: InternalEditorViewOptions): IViewConfigurationChangedEvent;
        clone(): InternalEditorViewOptions;
    }

    export interface IViewConfigurationChangedEvent {
        theme: boolean;
        canUseTranslate3d: boolean;
        experimentalScreenReader: boolean;
        rulers: boolean;
        ariaLabel: boolean;
        lineNumbers: boolean;
        selectOnLineNumbers: boolean;
        glyphMargin: boolean;
        revealHorizontalRightPadding: boolean;
        roundedSelection: boolean;
        overviewRulerLanes: boolean;
        cursorBlinking: boolean;
        cursorStyle: boolean;
        hideCursorInOverviewRuler: boolean;
        scrollBeyondLastLine: boolean;
        editorClassName: boolean;
        stopRenderingLineAfter: boolean;
        renderWhitespace: boolean;
        indentGuides: boolean;
        scrollbar: boolean;
    }

    export class EditorContribOptions {
        selectionClipboard: boolean;
        hover: boolean;
        contextmenu: boolean;
        quickSuggestions: boolean;
        quickSuggestionsDelay: number;
        iconsInSuggestions: boolean;
        formatOnType: boolean;
        suggestOnTriggerCharacters: boolean;
        acceptSuggestionOnEnter: boolean;
        selectionHighlight: boolean;
        outlineMarkers: boolean;
        referenceInfos: boolean;
        folding: boolean;
        constructor(source: {
            selectionClipboard: boolean;
            hover: boolean;
            contextmenu: boolean;
            quickSuggestions: boolean;
            quickSuggestionsDelay: number;
            iconsInSuggestions: boolean;
            formatOnType: boolean;
            suggestOnTriggerCharacters: boolean;
            acceptSuggestionOnEnter: boolean;
            selectionHighlight: boolean;
            outlineMarkers: boolean;
            referenceInfos: boolean;
            folding: boolean;
        });
        equals(other: EditorContribOptions): boolean;
        clone(): EditorContribOptions;
    }

    /**
     * Internal configuration options (transformed or computed) for the editor.
     */
    export class InternalEditorOptions {
        _internalEditorOptionsBrand: void;
        lineHeight: number;
        readOnly: boolean;
        wordSeparators: string;
        autoClosingBrackets: boolean;
        useTabStops: boolean;
        tabFocusMode: boolean;
        layoutInfo: EditorLayoutInfo;
        fontInfo: FontInfo;
        viewInfo: InternalEditorViewOptions;
        wrappingInfo: EditorWrappingInfo;
        contribInfo: EditorContribOptions;
        constructor(source: {
            lineHeight: number;
            readOnly: boolean;
            wordSeparators: string;
            autoClosingBrackets: boolean;
            useTabStops: boolean;
            tabFocusMode: boolean;
            layoutInfo: EditorLayoutInfo;
            fontInfo: FontInfo;
            viewInfo: InternalEditorViewOptions;
            wrappingInfo: EditorWrappingInfo;
            contribInfo: EditorContribOptions;
        });
        equals(other: InternalEditorOptions): boolean;
        createChangeEvent(newOpts: InternalEditorOptions): IConfigurationChangedEvent;
        clone(): InternalEditorOptions;
    }

    /**
     * An event describing that the configuration of the editor has changed.
     */
    export interface IConfigurationChangedEvent {
        lineHeight: boolean;
        readOnly: boolean;
        wordSeparators: boolean;
        autoClosingBrackets: boolean;
        useTabStops: boolean;
        tabFocusMode: boolean;
        layoutInfo: boolean;
        fontInfo: boolean;
        viewInfo: IViewConfigurationChangedEvent;
        wrappingInfo: boolean;
        contribInfo: boolean;
    }

    /**
     * An event describing that one or more supports of a mode have changed.
     */
    export interface IModeSupportChangedEvent {
        tokenizationSupport: boolean;
        richEditSupport: boolean;
    }

    /**
     * Vertical Lane in the overview ruler of the editor.
     */
    export enum OverviewRulerLane {
        Left = 1,
        Center = 2,
        Right = 4,
        Full = 7,
    }

    /**
     * Options for rendering a model decoration in the overview ruler.
     */
    export interface IModelDecorationOverviewRulerOptions {
        /**
         * CSS color to render in the overview ruler.
         * e.g.: rgba(100, 100, 100, 0.5)
         */
        color: string;
        /**
         * CSS color to render in the overview ruler.
         * e.g.: rgba(100, 100, 100, 0.5)
         */
        darkColor: string;
        /**
         * The position in the overview ruler.
         */
        position: OverviewRulerLane;
    }

    /**
     * Options for a model decoration.
     */
    export interface IModelDecorationOptions {
        /**
         * Customize the growing behaviour of the decoration when typing at the edges of the decoration.
         * Defaults to TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges
         */
        stickiness?: TrackedRangeStickiness;
        /**
         * CSS class name describing the decoration.
         */
        className?: string;
        /**
         * Message to be rendered when hovering over the decoration.
         */
        hoverMessage?: string;
        /**
         * Array of IHTMLContentElements to render as the decoration message.
         */
        htmlMessage?: IHTMLContentElement[];
        /**
         * Should the decoration expand to encompass a whole line.
         */
        isWholeLine?: boolean;
        /**
         * @deprecated : Use `overviewRuler` instead
         */
        showInOverviewRuler?: string;
        /**
         * If set, render this decoration in the overview ruler.
         */
        overviewRuler?: IModelDecorationOverviewRulerOptions;
        /**
         * If set, the decoration will be rendered in the glyph margin with this CSS class name.
         */
        glyphMarginClassName?: string;
        /**
         * If set, the decoration will be rendered in the lines decorations with this CSS class name.
         */
        linesDecorationsClassName?: string;
        /**
         * If set, the decoration will be rendered inline with the text with this CSS class name.
         * Please use this only for CSS rules that must impact the text. For example, use `className`
         * to have a background color decoration.
         */
        inlineClassName?: string;
    }

    /**
     * New model decorations.
     */
    export interface IModelDeltaDecoration {
        /**
         * Range that this decoration covers.
         */
        range: IRange;
        /**
         * Options associated with this decoration.
         */
        options: IModelDecorationOptions;
    }

    /**
     * A tracked range in the model.
     */
    export interface IModelTrackedRange {
        /**
         * Identifier for a tracked range
         */
        id: string;
        /**
         * Range that this tracked range covers
         */
        range: IEditorRange;
    }

    /**
     * A decoration in the model.
     */
    export interface IModelDecoration {
        /**
         * Identifier for a decoration.
         */
        id: string;
        /**
         * Identifier for a decoration's owener.
         */
        ownerId: number;
        /**
         * Range that this decoration covers.
         */
        range: IEditorRange;
        /**
         * Options associated with this decoration.
         */
        options: IModelDecorationOptions;
    }

    /**
     * An accessor that can add, change or remove model decorations.
     */
    export interface IModelDecorationsChangeAccessor {
        /**
         * Add a new decoration.
         * @param range Range that this decoration covers.
         * @param options Options associated with this decoration.
         * @return An unique identifier associated with this decoration.
         */
        addDecoration(range: IRange, options: IModelDecorationOptions): string;
        /**
         * Change the range that an existing decoration covers.
         * @param id The unique identifier associated with the decoration.
         * @param newRange The new range that this decoration covers.
         */
        changeDecoration(id: string, newRange: IRange): void;
        /**
         * Change the options associated with an existing decoration.
         * @param id The unique identifier associated with the decoration.
         * @param newOptions The new options associated with this decoration.
         */
        changeDecorationOptions(id: string, newOptions: IModelDecorationOptions): void;
        /**
         * Remove an existing decoration.
         * @param id The unique identifier associated with the decoration.
         */
        removeDecoration(id: string): void;
        /**
         * Perform a minimum ammount of operations, in order to transform the decorations
         * identified by `oldDecorations` to the decorations described by `newDecorations`
         * and returns the new identifiers associated with the resulting decorations.
         *
         * @param oldDecorations Array containing previous decorations identifiers.
         * @param newDecorations Array describing what decorations should result after the call.
         * @return An array containing the new decorations identifiers.
         */
        deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[]): string[];
    }

    /**
     * Word inside a model.
     */
    export interface IWordAtPosition {
        /**
         * The word.
         */
        word: string;
        /**
         * The column where the word starts.
         */
        startColumn: number;
        /**
         * The column where the word ends.
         */
        endColumn: number;
    }

    /**
     * Range of a word inside a model.
     */
    export interface IWordRange {
        /**
         * The index where the word starts.
         */
        start: number;
        /**
         * The index where the word ends.
         */
        end: number;
    }

    export interface ITokenInfo {
        token: IToken;
        lineNumber: number;
        startColumn: number;
        endColumn: number;
    }

    export interface ITokenIterator {
        hasNext(): boolean;
        next(): ITokenInfo;
        hasPrev(): boolean;
        prev(): ITokenInfo;
    }

    /**
     * End of line character preference.
     */
    export enum EndOfLinePreference {
        /**
         * Use the end of line character identified in the text buffer.
         */
        TextDefined = 0,
        /**
         * Use line feed (\n) as the end of line character.
         */
        LF = 1,
        /**
         * Use carriage return and line feed (\r\n) as the end of line character.
         */
        CRLF = 2,
    }

    /**
     * The default end of line to use when instantiating models.
     */
    export enum DefaultEndOfLine {
        /**
         * Use line feed (\n) as the end of line character.
         */
        LF = 1,
        /**
         * Use carriage return and line feed (\r\n) as the end of line character.
         */
        CRLF = 2,
    }

    /**
     * End of line character preference.
     */
    export enum EndOfLineSequence {
        /**
         * Use line feed (\n) as the end of line character.
         */
        LF = 0,
        /**
         * Use carriage return and line feed (\r\n) as the end of line character.
         */
        CRLF = 1,
    }

    /**
     * A read-only line marker in the model.
     */
    export interface IReadOnlyLineMarker {
        id: string;
        column: number;
    }

    /**
     * And identifier for a single edit operation.
     */
    export interface ISingleEditOperationIdentifier {
        /**
         * Identifier major
         */
        major: number;
        /**
         * Identifier minor
         */
        minor: number;
    }

    /**
     * A builder and helper for edit operations for a command.
     */
    export interface IEditOperationBuilder {
        /**
         * Add a new edit operation (a replace operation).
         * @param range The range to replace (delete). May be empty to represent a simple insert.
         * @param text The text to replace with. May be null to represent a simple delete.
         */
        addEditOperation(range: IEditorRange, text: string): void;
        /**
         * Track `selection` when applying edit operations.
         * A best effort will be made to not grow/expand the selection.
         * An empty selection will clamp to a nearby character.
         * @param selection The selection to track.
         * @param trackPreviousOnEmpty If set, and the selection is empty, indicates whether the selection
         *           should clamp to the previous or the next character.
         * @return A unique identifer.
         */
        trackSelection(selection: IEditorSelection, trackPreviousOnEmpty?: boolean): string;
    }

    /**
     * A helper for computing cursor state after a command.
     */
    export interface ICursorStateComputerData {
        /**
         * Get the inverse edit operations of the added edit operations.
         */
        getInverseEditOperations(): IIdentifiedSingleEditOperation[];
        /**
         * Get a previously tracked selection.
         * @param id The unique identifier returned by `trackSelection`.
         * @return The selection.
         */
        getTrackedSelection(id: string): IEditorSelection;
    }

    /**
     * A command that modifies text / cursor state on a model.
     */
    export interface ICommand {
        /**
         * Get the edit operations needed to execute this command.
         * @param model The model the command will execute on.
         * @param builder A helper to collect the needed edit operations and to track selections.
         */
        getEditOperations(model: ITokenizedModel, builder: IEditOperationBuilder): void;
        /**
         * Compute the cursor state after the edit operations were applied.
         * @param model The model the commad has executed on.
         * @param helper A helper to get inverse edit operations and to get previously tracked selections.
         * @return The cursor state after the command executed.
         */
        computeCursorState(model: ITokenizedModel, helper: ICursorStateComputerData): IEditorSelection;
    }

    /**
     * A single edit operation, that acts as a simple replace.
     * i.e. Replace text at `range` with `text` in model.
     */
    export interface ISingleEditOperation {
        /**
         * The range to replace. This can be empty to emulate a simple insert.
         */
        range: IRange;
        /**
         * The text to replace with. This can be null to emulate a simple delete.
         */
        text: string;
        /**
         * This indicates that this operation has "insert" semantics.
         * i.e. forceMoveMarkers = true => if `range` is collapsed, all markers at the position will be moved.
         */
        forceMoveMarkers?: boolean;
    }

    /**
     * A single edit operation, that has an identifier.
     */
    export interface IIdentifiedSingleEditOperation {
        /**
         * An identifier associated with this single edit operation.
         */
        identifier: ISingleEditOperationIdentifier;
        /**
         * The range to replace. This can be empty to emulate a simple insert.
         */
        range: IEditorRange;
        /**
         * The text to replace with. This can be null to emulate a simple delete.
         */
        text: string;
        /**
         * This indicates that this operation has "insert" semantics.
         * i.e. forceMoveMarkers = true => if `range` is collapsed, all markers at the position will be moved.
         */
        forceMoveMarkers: boolean;
        /**
         * This indicates that this operation is inserting automatic whitespace
         * that can be removed on next model edit operation if `config.trimAutoWhitespace` is true.
         */
        isAutoWhitespaceEdit?: boolean;
    }

    /**
     * A callback that can compute the cursor state after applying a series of edit operations.
     */
    export interface ICursorStateComputer {
        /**
         * A callback that can compute the resulting cursors state after some edit operations have been executed.
         */
        (inverseEditOperations: IIdentifiedSingleEditOperation[]): IEditorSelection[];
    }

    /**
     * A list of tokens on a line.
     */
    export interface ILineTokens {
        getTokenCount(): number;
        getTokenStartIndex(tokenIndex: number): number;
        getTokenType(tokenIndex: number): string;
        getTokenEndIndex(tokenIndex: number, textLength: number): number;
        /**
         * Check if tokens have changed. This is called by the view to validate rendered lines
         * and decide which lines need re-rendering.
         */
        equals(other: ILineTokens): boolean;
        /**
         * Find the token containing offset `offset`.
         *    For example, with the following tokens [0, 5), [5, 9), [9, infinity)
         *    Searching for 0, 1, 2, 3 or 4 will return 0.
         *    Searching for 5, 6, 7 or 8 will return 1.
         *    Searching for 9, 10, 11, ... will return 2.
         * @param offset The search offset
         * @return The index of the token containing the offset.
         */
        findIndexOfOffset(offset: number): number;
        sliceAndInflate(startOffset: number, endOffset: number, deltaStartIndex: number): ViewLineToken[];
        inflate(): ViewLineToken[];
    }

    export interface ITextModelResolvedOptions {
        tabSize: number;
        insertSpaces: boolean;
        defaultEOL: DefaultEndOfLine;
        trimAutoWhitespace: boolean;
    }

    export interface ITextModelCreationOptions {
        tabSize: number;
        insertSpaces: boolean;
        detectIndentation: boolean;
        trimAutoWhitespace: boolean;
        defaultEOL: DefaultEndOfLine;
    }

    export interface ITextModelUpdateOptions {
        tabSize?: number;
        insertSpaces?: boolean;
        trimAutoWhitespace?: boolean;
    }

    export interface IModelOptionsChangedEvent {
        tabSize: boolean;
        insertSpaces: boolean;
        trimAutoWhitespace: boolean;
    }

    /**
     * A textual read-only model.
     */
    export interface ITextModel {
        getOptions(): ITextModelResolvedOptions;
        /**
         * Get the current version id of the model.
         * Anytime a change happens to the model (even undo/redo),
         * the version id is incremented.
         */
        getVersionId(): number;
        /**
         * Get the alternative version id of the model.
         * This alternative version id is not always incremented,
         * it will return the same values in the case of undo-redo.
         */
        getAlternativeVersionId(): number;
        /**
         * Replace the entire text buffer value contained in this model.
         */
        setValue(newValue: string): void;
        /**
         * Get the text stored in this model.
         * @param eol The end of line character preference. Defaults to `EndOfLinePreference.TextDefined`.
         * @param preserverBOM Preserve a BOM character if it was detected when the model was constructed.
         * @return The text.
         */
        getValue(eol?: EndOfLinePreference, preserveBOM?: boolean): string;
        getValueLength(eol?: EndOfLinePreference, preserveBOM?: boolean): number;
        toRawText(): IRawText;
        equals(other: IRawText): boolean;
        /**
         * Get the text in a certain range.
         * @param range The range describing what text to get.
         * @param eol The end of line character preference. This will only be used for multiline ranges. Defaults to `EndOfLinePreference.TextDefined`.
         * @return The text.
         */
        getValueInRange(range: IRange, eol?: EndOfLinePreference): string;
        /**
         * Get the length of text in a certain range.
         * @param range The range describing what text length to get.
         * @return The text length.
         */
        getValueLengthInRange(range: IRange): number;
        /**
         * Splits characters in two buckets. First bucket (A) is of characters that
         * sit in lines with length < `LONG_LINE_BOUNDARY`. Second bucket (B) is of
         * characters that sit in lines with length >= `LONG_LINE_BOUNDARY`.
         * If count(B) > count(A) return true. Returns false otherwise.
         */
        isDominatedByLongLines(): boolean;
        /**
         * Get the number of lines in the model.
         */
        getLineCount(): number;
        /**
         * Get the text for a certain line.
         */
        getLineContent(lineNumber: number): string;
        /**
         * Get the text for all lines.
         */
        getLinesContent(): string[];
        /**
         * Get the end of line character predominantly used in the text buffer.
         * @return EOL char sequence (e.g.: '\n' or '\r\n').
         */
        getEOL(): string;
        setEOL(eol: EndOfLineSequence): void;
        /**
         * Get the minimum legal column for line at `lineNumber`
         */
        getLineMinColumn(lineNumber: number): number;
        /**
         * Get the maximum legal column for line at `lineNumber`
         */
        getLineMaxColumn(lineNumber: number): number;
        /**
         * Returns the column before the first non whitespace character for line at `lineNumber`.
         * Returns 0 if line is empty or contains only whitespace.
         */
        getLineFirstNonWhitespaceColumn(lineNumber: number): number;
        /**
         * Returns the column after the last non whitespace character for line at `lineNumber`.
         * Returns 0 if line is empty or contains only whitespace.
         */
        getLineLastNonWhitespaceColumn(lineNumber: number): number;
        /**
         * Create a valid position,
         */
        validatePosition(position: IPosition): IEditorPosition;
        /**
         * Advances the given position by the given offest (negative offsets are also accepted)
         * and returns it as a new valid position.
         *
         * If the offset and position are such that their combination goes beyond the beginning or
         * end of the model, throws an exception.
         *
         * If the ofsset is such that the new position would be in the middle of a multi-byte
         * line terminator, throws an exception.
         */
        modifyPosition(position: IPosition, offset: number): IEditorPosition;
        /**
         * Create a valid range.
         */
        validateRange(range: IRange): IEditorRange;
        /**
         * Get a range covering the entire model
         */
        getFullModelRange(): IEditorRange;
        /**
         * Returns iff the model was disposed or not.
         */
        isDisposed(): boolean;
        /**
         * No mode supports allowed on this model because it is simply too large.
         * (even tokenization would cause too much memory pressure)
         */
        isTooLargeForHavingAMode(): boolean;
        /**
         * Only basic mode supports allowed on this model because it is simply too large.
         * (tokenization is allowed and other basic supports)
         */
        isTooLargeForHavingARichMode(): boolean;
    }

    export interface IReadOnlyModel extends ITextModel {
        /**
         * Gets the resource associated with this editor model.
         */
        uri: Uri;
        getModeId(): string;
        /**
         * Get the word under or besides `position`.
         * @param position The position to look for a word.
         * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
         * @return The word under or besides `position`. Might be null.
         */
        getWordAtPosition(position: IPosition): IWordAtPosition;
        /**
         * Get the word under or besides `position` trimmed to `position`.column
         * @param position The position to look for a word.
         * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
         * @return The word under or besides `position`. Will never be null.
         */
        getWordUntilPosition(position: IPosition): IWordAtPosition;
    }

    export interface IRichEditBracket {
        modeId: string;
        open: string;
        close: string;
        forwardRegex: RegExp;
        reversedRegex: RegExp;
    }

    export interface IFoundBracket {
        range: IEditorRange;
        open: string;
        close: string;
        isOpen: boolean;
    }

    /**
     * A model that is tokenized.
     */
    export interface ITokenizedModel extends ITextModel {
        /**
         * Tokenize if necessary and get the tokens for the line `lineNumber`.
         * @param lineNumber The line number
         * @param inaccurateTokensAcceptable Are inaccurate tokens acceptable? Defaults to false
         */
        getLineTokens(lineNumber: number, inaccurateTokensAcceptable?: boolean): ILineTokens;
        /**
         * Tokenize if necessary and get the tokenization result for the line `lineNumber`, as returned by the language mode.
         */
        getLineContext(lineNumber: number): ILineContext;
        _getLineModeTransitions(lineNumber: number): IModeTransition[];
        /**
         * Replace the entire text buffer value contained in this model.
         * Optionally, the language mode of the model can be changed.
         * This call clears all of the undo / redo stack,
         * removes all decorations or tracked ranges, emits a
         * ModelContentChanged(ModelContentChangedFlush) event and
         * unbinds the mirror model from the previous mode to the new
         * one if the mode has changed.
         */
        setValue(newValue: string, newMode?: IMode): void;
        /**
         * Get the current language mode associated with the model.
         */
        getMode(): IMode;
        /**
         * Set the current language mode associated with the model.
         */
        setMode(newMode: IMode): void;
        setMode(newModePromise: TPromise<IMode>): void;
        /**
         * A mode can be currently pending loading if a promise is used when constructing a model or calling setMode().
         *
         * If there is no currently pending loading mode, then the result promise will complete immediately.
         * Otherwise, the result will complete once the currently pending loading mode is loaded.
         */
        whenModeIsReady(): TPromise<IMode>;
        /**
         * Returns the true (inner-most) language mode at a given position.
         */
        getModeAtPosition(lineNumber: number, column: number): IMode;
        /**
         * Get the word under or besides `position`.
         * @param position The position to look for a word.
         * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
         * @return The word under or besides `position`. Might be null.
         */
        getWordAtPosition(position: IPosition): IWordAtPosition;
        /**
         * Get the word under or besides `position` trimmed to `position`.column
         * @param position The position to look for a word.
         * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
         * @return The word under or besides `position`. Will never be null.
         */
        getWordUntilPosition(position: IPosition): IWordAtPosition;
        /**
         * Returns an iterator that can be used to read
         * next and previous tokens from the provided position.
         * The iterator is made available through the callback
         * function and can't be used afterwards.
         */
        tokenIterator(position: IPosition, callback: (it: ITokenIterator) => any): any;
        /**
         * Find the matching bracket of `request` up, counting brackets.
         * @param request The bracket we're searching for
         * @param position The position at which to start the search.
         * @return The range of the matching bracket, or null if the bracket match was not found.
         */
        findMatchingBracketUp(bracket: string, position: IPosition): IEditorRange;
        /**
         * Given a `position`, if the position is on top or near a bracket,
         * find the matching bracket of that bracket and return the ranges of both brackets.
         * @param position The position at which to look for a bracket.
         */
        matchBracket(position: IPosition): [IEditorRange, IEditorRange];
    }

    /**
     * A model that can track markers.
     */
    export interface ITextModelWithMarkers extends ITextModel {
        _addMarker(lineNumber: number, column: number, stickToPreviousCharacter: boolean): string;
        _changeMarker(id: string, newLineNumber: number, newColumn: number): void;
        _changeMarkerStickiness(id: string, newStickToPreviousCharacter: boolean): void;
        _getMarker(id: string): IEditorPosition;
        _removeMarker(id: string): void;
        _getLineMarkers(lineNumber: number): IReadOnlyLineMarker[];
    }

    /**
     * A map of changed ranges used during the model internal processing
     */
    export interface IChangedTrackedRanges {
        [key: string]: IRange;
    }

    export enum TrackedRangeStickiness {
        AlwaysGrowsWhenTypingAtEdges = 0,
        NeverGrowsWhenTypingAtEdges = 1,
        GrowsOnlyWhenTypingBefore = 2,
        GrowsOnlyWhenTypingAfter = 3,
    }

    /**
     * A model that can track ranges.
     */
    export interface ITextModelWithTrackedRanges extends ITextModel {
        /**
         * Start tracking a range (across edit operations).
         * @param range The range to start tracking.
         * @param stickiness The behaviour when typing at the edges of the range.
         * @return A unique identifier for the tracked range.
         */
        addTrackedRange(range: IRange, stickiness: TrackedRangeStickiness): string;
        /**
         * Change the range of a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRange` call.
         * @param newRange The new range of the tracked range.
         */
        changeTrackedRange(id: string, newRange: IRange): void;
        /**
         * Change the stickiness (behaviour when typing at the edges of the range) for a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRange` call.
         * @param newStickiness The new behaviour when typing at the edges of the range.
         */
        changeTrackedRangeStickiness(id: string, newStickiness: TrackedRangeStickiness): void;
        /**
         * Remove a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRaneg` call.
         */
        removeTrackedRange(id: string): void;
        /**
         * Get the range of a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRaneg` call.
         */
        getTrackedRange(id: string): IEditorRange;
        /**
         * Gets all the tracked ranges for the lines between `startLineNumber` and `endLineNumber` as an array.
         * @param startLineNumber The start line number
         * @param endLineNumber The end line number
         * @return An array with the tracked ranges
         */
        getLinesTrackedRanges(startLineNumber: number, endLineNumber: number): IModelTrackedRange[];
    }

    /**
     * A model that can have decorations.
     */
    export interface ITextModelWithDecorations {
        /**
         * Change the decorations. The callback will be called with a change accessor
         * that becomes invalid as soon as the callback finishes executing.
         * This allows for all events to be queued up until the change
         * is completed. Returns whatever the callback returns.
         * @param ownerId Identifies the editor id in which these decorations should appear. If no `ownerId` is provided, the decorations will appear in all editors that attach this model.
         */
        changeDecorations(callback: (changeAccessor: IModelDecorationsChangeAccessor) => any, ownerId?: number): any;
        /**
         * Perform a minimum ammount of operations, in order to transform the decorations
         * identified by `oldDecorations` to the decorations described by `newDecorations`
         * and returns the new identifiers associated with the resulting decorations.
         *
         * @param oldDecorations Array containing previous decorations identifiers.
         * @param newDecorations Array describing what decorations should result after the call.
         * @param ownerId Identifies the editor id in which these decorations should appear. If no `ownerId` is provided, the decorations will appear in all editors that attach this model.
         * @return An array containing the new decorations identifiers.
         */
        deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[], ownerId?: number): string[];
        /**
         * Remove all decorations that have been added with this specific ownerId.
         * @param ownerId The owner id to search for.
         */
        removeAllDecorationsWithOwnerId(ownerId: number): void;
        /**
         * Get the options associated with a decoration.
         * @param id The decoration id.
         * @return The decoration options or null if the decoration was not found.
         */
        getDecorationOptions(id: string): IModelDecorationOptions;
        /**
         * Get the range associated with a decoration.
         * @param id The decoration id.
         * @return The decoration range or null if the decoration was not found.
         */
        getDecorationRange(id: string): IEditorRange;
        /**
         * Gets all the decorations for the line `lineNumber` as an array.
         * @param lineNumber The line number
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         * @return An array with the decorations
         */
        getLineDecorations(lineNumber: number, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];
        /**
         * Gets all the decorations for the lines between `startLineNumber` and `endLineNumber` as an array.
         * @param startLineNumber The start line number
         * @param endLineNumber The end line number
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         * @return An array with the decorations
         */
        getLinesDecorations(startLineNumber: number, endLineNumber: number, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];
        /**
         * Gets all the deocorations in a range as an array. Only `startLineNumber` and `endLineNumber` from `range` are used for filtering.
         * So for now it returns all the decorations on the same line as `range`.
         * @param range The range to search in
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         * @return An array with the decorations
         */
        getDecorationsInRange(range: IRange, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];
        /**
         * Gets all the decorations as an array.
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         */
        getAllDecorations(ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];
    }

    /**
     * An editable text model.
     */
    export interface IEditableTextModel extends ITextModelWithMarkers {
        normalizeIndentation(str: string): string;
        getOneIndent(): string;
        updateOptions(newOpts: ITextModelUpdateOptions): void;
        detectIndentation(defaultInsertSpaces: boolean, defaultTabSize: number): void;
        /**
         * Push a stack element onto the undo stack. This acts as an undo/redo point.
         * The idea is to use `pushEditOperations` to edit the model and then to
         * `pushStackElement` to create an undo/redo stop point.
         */
        pushStackElement(): void;
        /**
         * Push edit operations, basically editing the model. This is the preferred way
         * of editing the model. The edit operations will land on the undo stack.
         * @param beforeCursorState The cursor state before the edit operaions. This cursor state will be returned when `undo` or `redo` are invoked.
         * @param editOperations The edit operations.
         * @param cursorStateComputer A callback that can compute the resulting cursors state after the edit operations have been executed.
         * @return The cursor state returned by the `cursorStateComputer`.
         */
        pushEditOperations(beforeCursorState: IEditorSelection[], editOperations: IIdentifiedSingleEditOperation[], cursorStateComputer: ICursorStateComputer): IEditorSelection[];
        /**
         * Edit the model without adding the edits to the undo stack.
         * This can have dire consequences on the undo stack! See @pushEditOperations for the preferred way.
         * @param operations The edit operations.
         * @return The inverse edit operations, that, when applied, will bring the model back to the previous state.
         */
        applyEdits(operations: IIdentifiedSingleEditOperation[]): IIdentifiedSingleEditOperation[];
        /**
         * Undo edit operations until the first previous stop point created by `pushStackElement`.
         * The inverse edit operations will be pushed on the redo stack.
         */
        undo(): IEditorSelection[];
        /**
         * Redo edit operations until the next stop point created by `pushStackElement`.
         * The inverse edit operations will be pushed on the undo stack.
         */
        redo(): IEditorSelection[];
        /**
         * Set an editable range on the model.
         */
        setEditableRange(range: IRange): void;
        /**
         * Check if the model has an editable range.
         */
        hasEditableRange(): boolean;
        /**
         * Get the editable range on the model.
         */
        getEditableRange(): IEditorRange;
    }

    /**
     * A model.
     */
    export interface IModel extends IReadOnlyModel, IEditableTextModel, ITextModelWithMarkers, ITokenizedModel, ITextModelWithTrackedRanges, ITextModelWithDecorations, IEventEmitter, IEditorModel {
        /**
         * A unique identifier associated with this model.
         */
        id: string;
        /**
         * Destroy this model. This will unbind the model from the mode
         * and make all necessary clean-up to release this object to the GC.
         */
        destroy(): void;
        /**
         * Search the model.
         * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
         * @param searchOnlyEditableRange Limit the searching to only search inside the editable range of the model.
         * @param isRegex Used to indicate that `searchString` is a regular expression.
         * @param matchCase Force the matching to match lower/upper case exactly.
         * @param wholeWord Force the matching to match entire words only.
         * @param limitResultCount Limit the number of results
         * @return The ranges where the matches are. It is empty if not matches have been found.
         */
        findMatches(searchString: string, searchOnlyEditableRange: boolean, isRegex: boolean, matchCase: boolean, wholeWord: boolean, limitResultCount?: number): IEditorRange[];
        /**
         * Search the model.
         * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
         * @param searchScope Limit the searching to only search inside this range.
         * @param isRegex Used to indicate that `searchString` is a regular expression.
         * @param matchCase Force the matching to match lower/upper case exactly.
         * @param wholeWord Force the matching to match entire words only.
         * @param limitResultCount Limit the number of results
         * @return The ranges where the matches are. It is empty if no matches have been found.
         */
        findMatches(searchString: string, searchScope: IRange, isRegex: boolean, matchCase: boolean, wholeWord: boolean, limitResultCount?: number): IEditorRange[];
        /**
         * Search the model for the next match. Loops to the beginning of the model if needed.
         * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
         * @param searchStart Start the searching at the specified position.
         * @param isRegex Used to indicate that `searchString` is a regular expression.
         * @param matchCase Force the matching to match lower/upper case exactly.
         * @param wholeWord Force the matching to match entire words only.
         * @return The range where the next match is. It is null if no next match has been found.
         */
        findNextMatch(searchString: string, searchStart: IPosition, isRegex: boolean, matchCase: boolean, wholeWord: boolean): IEditorRange;
        /**
         * Search the model for the previous match. Loops to the end of the model if needed.
         * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
         * @param searchStart Start the searching at the specified position.
         * @param isRegex Used to indicate that `searchString` is a regular expression.
         * @param matchCase Force the matching to match lower/upper case exactly.
         * @param wholeWord Force the matching to match entire words only.
         * @return The range where the previous match is. It is null if no previous match has been found.
         */
        findPreviousMatch(searchString: string, searchStart: IPosition, isRegex: boolean, matchCase: boolean, wholeWord: boolean): IEditorRange;
        /**
         * Replace the entire text buffer value contained in this model.
         * Optionally, the language mode of the model can be changed.
         * This call clears all of the undo / redo stack,
         * removes all decorations or tracked ranges, emits a
         * ModelContentChanged(ModelContentChangedFlush) event and
         * unbinds the mirror model from the previous mode to the new
         * one if the mode has changed.
         */
        setValue(newValue: string, newMode?: IMode): void;
        setValue(newValue: string, newModePromise: TPromise<IMode>): void;
        setValueFromRawText(newValue: IRawText, newMode?: IMode): void;
        setValueFromRawText(newValue: IRawText, newModePromise: TPromise<IMode>): void;
        onBeforeAttached(): void;
        onBeforeDetached(): void;
        /**
         * Returns iff this model is attached to an editor or not.
         */
        isAttachedToEditor(): boolean;
    }

    export interface IRangeWithText {
        text: string;
        range: IRange;
    }

    export interface IMirrorModel extends IEventEmitter, ITokenizedModel {
        getEmbeddedAtPosition(position: IPosition): IMirrorModel;
        getAllEmbedded(): IMirrorModel[];
        uri: Uri;
        getOffsetFromPosition(position: IPosition): number;
        getPositionFromOffset(offset: number): IPosition;
        getOffsetAndLengthFromRange(range: IRange): {
            offset: number;
            length: number;
        };
        getRangeFromOffsetAndLength(offset: number, length: number): IRange;
        getLineStart(lineNumber: number): number;
        getAllWordsWithRange(): IRangeWithText[];
        getAllUniqueWords(skipWordOnce?: string): string[];
        getModeId(): string;
    }

    /**
     * An event describing that the current mode associated with a model has changed.
     */
    export interface IModelModeChangedEvent {
        /**
         * Previous mode
         */
        oldMode: IMode;
        /**
         * New mode
         */
        newMode: IMode;
    }

    /**
     * An event describing a change in the text of a model.
     */
    export interface IModelContentChangedEvent2 {
        /**
         * The range that got replaced.
         */
        range: IRange;
        /**
         * The length of the range that got replaced.
         */
        rangeLength: number;
        /**
         * The new text for the range.
         */
        text: string;
        /**
         * The (new) end-of-line character.
         */
        eol: string;
        /**
         * The new version id the model has transitioned to.
         */
        versionId: number;
        /**
         * Flag that indicates that this event was generated while undoing.
         */
        isUndoing: boolean;
        /**
         * Flag that indicates that this event was generated while redoing.
         */
        isRedoing: boolean;
    }

    /**
     * An event describing a change in the text of a model.
     */
    export interface IModelContentChangedEvent {
        /**
         * The event type. It can be used to detect the actual event type:
         * 		EditorCommon.EventType.ModelContentChangedFlush => IModelContentChangedFlushEvent
         * 		EditorCommon.EventType.ModelContentChangedLinesDeleted => IModelContentChangedLineChangedEvent
         * 		EditorCommon.EventType.ModelContentChangedLinesInserted => IModelContentChangedLinesDeletedEvent
         * 		EditorCommon.EventType.ModelContentChangedLineChanged => IModelContentChangedLinesInsertedEvent
         */
        changeType: string;
        /**
         * The new version id the model has transitioned to.
         */
        versionId: number;
        /**
         * Flag that indicates that this event was generated while undoing.
         */
        isUndoing: boolean;
        /**
         * Flag that indicates that this event was generated while redoing.
         */
        isRedoing: boolean;
    }

    export interface IRawText {
        length: number;
        lines: string[];
        BOM: string;
        EOL: string;
        options: ITextModelResolvedOptions;
    }

    /**
     * An event describing that a model has been reset to a new value.
     */
    export interface IModelContentChangedFlushEvent extends IModelContentChangedEvent {
        /**
         * The new text content of the model.
         */
        detail: IRawText;
    }

    /**
     * An event describing that a line has changed in a model.
     */
    export interface IModelContentChangedLineChangedEvent extends IModelContentChangedEvent {
        /**
         * The line that has changed.
         */
        lineNumber: number;
        /**
         * The new value of the line.
         */
        detail: string;
    }

    /**
     * An event describing that line(s) have been deleted in a model.
     */
    export interface IModelContentChangedLinesDeletedEvent extends IModelContentChangedEvent {
        /**
         * At what line the deletion began (inclusive).
         */
        fromLineNumber: number;
        /**
         * At what line the deletion stopped (inclusive).
         */
        toLineNumber: number;
    }

    /**
     * An event describing that line(s) have been inserted in a model.
     */
    export interface IModelContentChangedLinesInsertedEvent extends IModelContentChangedEvent {
        /**
         * Before what line did the insertion begin
         */
        fromLineNumber: number;
        /**
         * `toLineNumber` - `fromLineNumber` + 1 denotes the number of lines that were inserted
         */
        toLineNumber: number;
        /**
         * The text that was inserted
         */
        detail: string;
    }

    /**
     * Decoration data associated with a model decorations changed event.
     */
    export interface IModelDecorationsChangedEventDecorationData {
        id: string;
        ownerId: number;
        range: IRange;
        isForValidation: boolean;
        options: IModelDecorationOptions;
    }

    /**
     * An event describing that model decorations have changed.
     */
    export interface IModelDecorationsChangedEvent {
        /**
         * A summary with ids of decorations that have changed.
         */
        ids: string[];
        /**
         * Lists of details
         */
        addedOrChangedDecorations: IModelDecorationsChangedEventDecorationData[];
        removedDecorations: string[];
        oldOptions: {
            [decorationId: string]: IModelDecorationOptions;
        };
        oldRanges: {
            [decorationId: string]: IRange;
        };
    }

    /**
     * An event describing that a range of lines has been tokenized
     */
    export interface IModelTokensChangedEvent {
        /**
         * The start of the range (inclusive)
         */
        fromLineNumber: number;
        /**
         * The end of the range (inclusive)
         */
        toLineNumber: number;
    }

    export enum CursorChangeReason {
        NotSet = 0,
        ContentFlush = 1,
        RecoverFromMarkers = 2,
        Explicit = 3,
        Paste = 4,
        Undo = 5,
        Redo = 6,
    }

    /**
     * An event describing that the cursor position has changed.
     */
    export interface ICursorPositionChangedEvent {
        /**
         * Primary cursor's position.
         */
        position: IEditorPosition;
        /**
         * Primary cursor's view position
         */
        viewPosition: IEditorPosition;
        /**
         * Secondary cursors' position.
         */
        secondaryPositions: IEditorPosition[];
        /**
         * Secondary cursors' view position.
         */
        secondaryViewPositions: IEditorPosition[];
        /**
         * Reason.
         */
        reason: CursorChangeReason;
        /**
         * Source of the call that caused the event.
         */
        source: string;
        /**
         * Is the primary cursor in the editable range?
         */
        isInEditableRange: boolean;
    }

    /**
     * An event describing that the cursor selection has changed.
     */
    export interface ICursorSelectionChangedEvent {
        /**
         * The primary selection.
         */
        selection: IEditorSelection;
        /**
         * The primary selection in view coordinates.
         */
        viewSelection: IEditorSelection;
        /**
         * The secondary selections.
         */
        secondarySelections: IEditorSelection[];
        /**
         * The secondary selections in view coordinates.
         */
        secondaryViewSelections: IEditorSelection[];
        /**
         * Source of the call that caused the event.
         */
        source: string;
        /**
         * Reason.
         */
        reason: CursorChangeReason;
    }

    export enum VerticalRevealType {
        Simple = 0,
        Center = 1,
        CenterIfOutsideViewport = 2,
    }

    /**
     * An event describing a request to reveal a specific range in the view of the editor.
     */
    export interface ICursorRevealRangeEvent {
        /**
         * Range to be reavealed.
         */
        range: IEditorRange;
        /**
         * View range to be reavealed.
         */
        viewRange: IEditorRange;
        verticalType: VerticalRevealType;
        /**
         * If true: there should be a horizontal & vertical revealing
         * If false: there should be just a vertical revealing
         */
        revealHorizontal: boolean;
    }

    export interface ICursorScrollRequestEvent {
        deltaLines: number;
    }

    export interface IModelChangedEvent {
        oldModelUrl: string;
        newModelUrl: string;
    }

    export interface IEditorWhitespace {
        id: number;
        afterLineNumber: number;
        heightInLines: number;
    }

    /**
     * A description for the overview ruler position.
     */
    export class OverviewRulerPosition {
        _overviewRulerPositionBrand: void;
        /**
         * Width of the overview ruler
         */
        width: number;
        /**
         * Height of the overview ruler
         */
        height: number;
        /**
         * Top position for the overview ruler
         */
        top: number;
        /**
         * Right position for the overview ruler
         */
        right: number;
        constructor(source: {
            width: number;
            height: number;
            top: number;
            right: number;
        });
        equals(other: OverviewRulerPosition): boolean;
        clone(): OverviewRulerPosition;
    }

    /**
     * The internal layout details of the editor.
     */
    export class EditorLayoutInfo {
        _editorLayoutInfoBrand: void;
        /**
         * Full editor width.
         */
        width: number;
        /**
         * Full editor height.
         */
        height: number;
        /**
         * Left position for the glyph margin.
         */
        glyphMarginLeft: number;
        /**
         * The width of the glyph margin.
         */
        glyphMarginWidth: number;
        /**
         * The height of the glyph margin.
         */
        glyphMarginHeight: number;
        /**
         * Left position for the line numbers.
         */
        lineNumbersLeft: number;
        /**
         * The width of the line numbers.
         */
        lineNumbersWidth: number;
        /**
         * The height of the line numbers.
         */
        lineNumbersHeight: number;
        /**
         * Left position for the line decorations.
         */
        decorationsLeft: number;
        /**
         * The width of the line decorations.
         */
        decorationsWidth: number;
        /**
         * The height of the line decorations.
         */
        decorationsHeight: number;
        /**
         * Left position for the content (actual text)
         */
        contentLeft: number;
        /**
         * The width of the content (actual text)
         */
        contentWidth: number;
        /**
         * The height of the content (actual height)
         */
        contentHeight: number;
        /**
         * The width of the vertical scrollbar.
         */
        verticalScrollbarWidth: number;
        /**
         * The height of the horizontal scrollbar.
         */
        horizontalScrollbarHeight: number;
        /**
         * The position of the overview ruler.
         */
        overviewRuler: OverviewRulerPosition;
        constructor(source: {
            width: number;
            height: number;
            glyphMarginLeft: number;
            glyphMarginWidth: number;
            glyphMarginHeight: number;
            lineNumbersLeft: number;
            lineNumbersWidth: number;
            lineNumbersHeight: number;
            decorationsLeft: number;
            decorationsWidth: number;
            decorationsHeight: number;
            contentLeft: number;
            contentWidth: number;
            contentHeight: number;
            verticalScrollbarWidth: number;
            horizontalScrollbarHeight: number;
            overviewRuler: OverviewRulerPosition;
        });
        equals(other: EditorLayoutInfo): boolean;
        clone(): EditorLayoutInfo;
    }

    /**
     * Options for creating the editor.
     */
    export interface ICodeEditorWidgetCreationOptions extends IEditorOptions {
        model?: IModel;
    }

    /**
     * An editor model.
     */
    export interface IEditorModel {
    }

    /**
     * An editor view state.
     */
    export interface IEditorViewState {
    }

    export interface IDimension {
        width: number;
        height: number;
    }

    /**
     * Conditions describing action enablement
     */
    export interface IActionEnablement {
        /**
         * The action is enabled only if text in the editor is focused (e.g. blinking cursor).
         * Warning: This condition will be disabled if the action is marked to be displayed in the context menu
         * Defaults to false.
         */
        textFocus?: boolean;
        /**
         * The action is enabled only if the editor or its widgets have focus (e.g. focus is in find widget).
         * Defaults to false.
         */
        widgetFocus?: boolean;
        /**
         * The action is enabled only if the editor is not in read only mode.
         * Defaults to false.
         */
        writeableEditor?: boolean;
        /**
         * The action is enabled only if the cursor position is over tokens of a certain kind.
         * Defaults to no tokens required.
         */
        tokensAtPosition?: string[];
        /**
         * The action is enabled only if the cursor position is over a word (i.e. not whitespace).
         * Defaults to false.
         */
        wordAtPosition?: boolean;
    }

    /**
     * A (serializable) state of the cursors.
     */
    export interface ICursorState {
        inSelectionMode: boolean;
        selectionStart: IPosition;
        position: IPosition;
    }

    /**
     * A (serializable) state of the view.
     */
    export interface IViewState {
        scrollTop: number;
        scrollTopWithoutViewZones: number;
        scrollLeft: number;
    }

    /**
     * A (serializable) state of the code editor.
     */
    export interface ICodeEditorViewState extends IEditorViewState {
        cursorState: ICursorState[];
        viewState: IViewState;
        contributionsState: {
            [id: string]: any;
        };
    }

    /**
     * Type of hit element with the mouse in the editor.
     */
    export enum MouseTargetType {
        /**
         * Mouse is on top of an unknown element.
         */
        UNKNOWN = 0,
        /**
         * Mouse is on top of the textarea used for input.
         */
        TEXTAREA = 1,
        /**
         * Mouse is on top of the glyph margin
         */
        GUTTER_GLYPH_MARGIN = 2,
        /**
         * Mouse is on top of the line numbers
         */
        GUTTER_LINE_NUMBERS = 3,
        /**
         * Mouse is on top of the line decorations
         */
        GUTTER_LINE_DECORATIONS = 4,
        /**
         * Mouse is on top of the whitespace left in the gutter by a view zone.
         */
        GUTTER_VIEW_ZONE = 5,
        /**
         * Mouse is on top of text in the content.
         */
        CONTENT_TEXT = 6,
        /**
         * Mouse is on top of empty space in the content (e.g. after line text or below last line)
         */
        CONTENT_EMPTY = 7,
        /**
         * Mouse is on top of a view zone in the content.
         */
        CONTENT_VIEW_ZONE = 8,
        /**
         * Mouse is on top of a content widget.
         */
        CONTENT_WIDGET = 9,
        /**
         * Mouse is on top of the decorations overview ruler.
         */
        OVERVIEW_RULER = 10,
        /**
         * Mouse is on top of a scrollbar.
         */
        SCROLLBAR = 11,
        /**
         * Mouse is on top of an overlay widget.
         */
        OVERLAY_WIDGET = 12,
    }

    /**
     * A model for the diff editor.
     */
    export interface IDiffEditorModel extends IEditorModel {
        /**
         * Original model.
         */
        original: IModel;
        /**
         * Modified model.
         */
        modified: IModel;
    }

    /**
     * (Serializable) View state for the diff editor.
     */
    export interface IDiffEditorViewState extends IEditorViewState {
        original: ICodeEditorViewState;
        modified: ICodeEditorViewState;
    }

    /**
     * A change
     */
    export interface IChange {
        originalStartLineNumber: number;
        originalEndLineNumber: number;
        modifiedStartLineNumber: number;
        modifiedEndLineNumber: number;
    }

    /**
     * A character level change.
     */
    export interface ICharChange extends IChange {
        originalStartColumn: number;
        originalEndColumn: number;
        modifiedStartColumn: number;
        modifiedEndColumn: number;
    }

    /**
     * A line change
     */
    export interface ILineChange extends IChange {
        charChanges: ICharChange[];
    }

    /**
     * Information about a line in the diff editor
     */
    export interface IDiffLineInformation {
        equivalentLineNumber: number;
    }

    export const KEYBINDING_CONTEXT_EDITOR_TEXT_FOCUS: string;

    export const KEYBINDING_CONTEXT_EDITOR_FOCUS: string;

    export const KEYBINDING_CONTEXT_EDITOR_TAB_MOVES_FOCUS: string;

    export const KEYBINDING_CONTEXT_EDITOR_HAS_MULTIPLE_SELECTIONS: string;

    export const KEYBINDING_CONTEXT_EDITOR_HAS_NON_EMPTY_SELECTION: string;

    export const KEYBINDING_CONTEXT_EDITOR_LANGUAGE_ID: string;

    export const SHOW_ACCESSIBILITY_HELP_ACTION_ID: string;

    export class BareFontInfo {
        _bareFontInfoBrand: void;
        fontFamily: string;
        fontSize: number;
        lineHeight: number;
        constructor(opts: {
            fontFamily: string;
            fontSize: number;
            lineHeight: number;
        });
        getId(): string;
    }

    export class FontInfo extends BareFontInfo {
        _editorStylingBrand: void;
        typicalHalfwidthCharacterWidth: number;
        typicalFullwidthCharacterWidth: number;
        spaceWidth: number;
        maxDigitWidth: number;
        constructor(opts: {
            fontFamily: string;
            fontSize: number;
            lineHeight: number;
            typicalHalfwidthCharacterWidth: number;
            typicalFullwidthCharacterWidth: number;
            spaceWidth: number;
            maxDigitWidth: number;
        });
        equals(other: FontInfo): boolean;
        clone(): FontInfo;
    }

    export interface IConfiguration {
        onDidChange: IEvent<IConfigurationChangedEvent>;
        editor: InternalEditorOptions;
        setLineCount(lineCount: number): void;
    }

    export interface IViewEventNames {
        ModelFlushedEvent: string;
        LinesDeletedEvent: string;
        LinesInsertedEvent: string;
        LineChangedEvent: string;
        TokensChangedEvent: string;
        DecorationsChangedEvent: string;
        CursorPositionChangedEvent: string;
        CursorSelectionChangedEvent: string;
        RevealRangeEvent: string;
        LineMappingChangedEvent: string;
    }

    export var ViewEventNames: {
        ModelFlushedEvent: string;
        LinesDeletedEvent: string;
        LinesInsertedEvent: string;
        LineChangedEvent: string;
        TokensChangedEvent: string;
        DecorationsChangedEvent: string;
        CursorPositionChangedEvent: string;
        CursorSelectionChangedEvent: string;
        RevealRangeEvent: string;
        LineMappingChangedEvent: string;
        ScrollRequestEvent: string;
    };

    export interface IScrollEvent {
        scrollTop: number;
        scrollLeft: number;
        scrollWidth: number;
        scrollHeight: number;
        scrollTopChanged: boolean;
        scrollLeftChanged: boolean;
        scrollWidthChanged: boolean;
        scrollHeightChanged: boolean;
    }

    export interface INewScrollPosition {
        scrollLeft?: number;
        scrollTop?: number;
    }

    export interface IViewLinesDeletedEvent {
        /**
         * At what line the deletion began (inclusive).
         */
        fromLineNumber: number;
        /**
         * At what line the deletion stopped (inclusive).
         */
        toLineNumber: number;
    }

    export interface IViewLinesInsertedEvent {
        /**
         * Before what line did the insertion begin
         */
        fromLineNumber: number;
        /**
         * `toLineNumber` - `fromLineNumber` + 1 denotes the number of lines that were inserted
         */
        toLineNumber: number;
    }

    export interface IViewLineChangedEvent {
        /**
         * The line that has changed.
         */
        lineNumber: number;
    }

    export interface IViewTokensChangedEvent {
        /**
         * Start line number of range
         */
        fromLineNumber: number;
        /**
         * End line number of range
         */
        toLineNumber: number;
    }

    export interface IViewDecorationsChangedEvent {
        /**
         * signals that at least one inline decoration has changed
         */
        inlineDecorationsChanged: boolean;
    }

    export interface IViewCursorPositionChangedEvent {
        /**
         * Primary cursor's position.
         */
        position: IEditorPosition;
        /**
         * Secondary cursors' position.
         */
        secondaryPositions: IEditorPosition[];
        /**
         * Is the primary cursor in the editable range?
         */
        isInEditableRange: boolean;
    }

    export interface IViewCursorSelectionChangedEvent {
        /**
         * The primary selection.
         */
        selection: IEditorSelection;
        /**
         * The secondary selections.
         */
        secondarySelections: IEditorSelection[];
    }

    export interface IViewRevealRangeEvent {
        /**
         * Range to be reavealed.
         */
        range: IEditorRange;
        verticalType: VerticalRevealType;
        /**
         * If true: there should be a horizontal & vertical revealing
         * If false: there should be just a vertical revealing
         */
        revealHorizontal: boolean;
    }

    export interface IViewScrollRequestEvent {
        deltaLines: number;
    }

    export interface IViewWhitespaceViewportData {
        id: number;
        afterLineNumber: number;
        verticalOffset: number;
        height: number;
    }

    export class Viewport {
        _viewportBrand: void;
        top: number;
        left: number;
        width: number;
        height: number;
        constructor(top: number, left: number, width: number, height: number);
    }

    /**
     * Description of an action contribution
     */
    export interface IActionDescriptor {
        /**
         * An unique identifier of the contributed action.
         */
        id: string;
        /**
         * A label of the action that will be presented to the user.
         */
        label: string;
        /**
         * An array of keybindings for the action.
         */
        keybindings?: number[];
        keybindingContext?: string;
        /**
         * A set of enablement conditions.
         */
        enablement?: IActionEnablement;
        /**
         * Control if the action should show up in the context menu and where.
         * Built-in groups:
         *   1_goto/* => e.g. 1_goto/1_peekDefinition
         *   2_change/* => e.g. 2_change/2_format
         *   3_edit/* => e.g. 3_edit/1_copy
         *   4_tools/* => e.g. 4_tools/1_commands
         * You can also create your own group.
         * Defaults to null (don't show in context menu).
         */
        contextMenuGroupId?: string;
        /**
         * Method that will be executed when the action is triggered.
         * @param editor The editor instance is passed in as a convinience
         */
        run: (editor: ICommonCodeEditor) => TPromise<void>;
    }

    /**
     * Data associated with an editor action contribution
     */
    export interface IEditorActionDescriptorData {
        id: string;
        label: string;
        alias?: string;
    }

    export type IEditorActionContributionCtor = IConstructorSignature2<IEditorActionDescriptorData, ICommonCodeEditor, IEditorContribution>;

    export type ICommonEditorContributionCtor = IConstructorSignature1<ICommonCodeEditor, IEditorContribution>;

    /**
     * An editor contribution descriptor that will be used to construct editor contributions
     */
    export interface ICommonEditorContributionDescriptor {
        /**
         * Create an instance of the contribution
         */
        createInstance(instantiationService: IInstantiationService, editor: ICommonCodeEditor): IEditorContribution;
    }

    /**
     * An editor.
     */
    export interface IEditor extends IEventEmitter {
        getId(): string;
        /**
         * Get the editor type. Current supported types:
         * 			EditorCommon.EditorType.ICodeEditor => ICodeEditor;
         * 			EditorCommon.EditorType.IDiffEditor => IDiffEditor;
         * This is to avoid an instanceof check
         */
        getEditorType(): string;
        /**
         * Destroy the editor.
         */
        destroy(): void;
        /**
         * Update the editor's options after the editor has been created.
         */
        updateOptions(newOptions: IEditorOptions): void;
        /**
         * Indicates that the editor becomes visible.
         */
        onVisible(): void;
        /**
         * Indicates that the editor becomes hidden.
         */
        onHide(): void;
        /**
         * Instructs the editor to remeasure its container. This method should
         * be called when the container of the editor gets resized.
         */
        layout(dimension?: IDimension): void;
        /**
         * Brings browser focus to the editor
         */
        focus(): void;
        /**
         * Returns true if this editor has keyboard focus (e.g. cursor is blinking).
         */
        isFocused(): boolean;
        /**
         * Add a new action to this editor.
         */
        addAction(descriptor: IActionDescriptor): void;
        /**
         * Returns all actions associated with this editor.
         */
        getActions(): IAction[];
        /**
         * Saves current view state of the editor in a serializable object.
         */
        saveViewState(): IEditorViewState;
        /**
         * Restores the view state of the editor from a serializable object generated by `saveViewState`.
         */
        restoreViewState(state: IEditorViewState): void;
        /**
         * Given a position, returns a column number that takes tab-widths into account.
         */
        getVisibleColumnFromPosition(position: IPosition): number;
        /**
         * Returns the primary position of the cursor.
         */
        getPosition(): IEditorPosition;
        /**
         * Set the primary position of the cursor. This will remove any secondary cursors.
         * @param position New primary cursor's position
         */
        setPosition(position: IPosition): void;
        /**
         * Scroll vertically as necessary and reveal a line.
         */
        revealLine(lineNumber: number): void;
        /**
         * Scroll vertically as necessary and reveal a line centered vertically.
         */
        revealLineInCenter(lineNumber: number): void;
        /**
         * Scroll vertically as necessary and reveal a line centered vertically only if it lies outside the viewport.
         */
        revealLineInCenterIfOutsideViewport(lineNumber: number): void;
        /**
         * Scroll vertically or horizontally as necessary and reveal a position.
         */
        revealPosition(position: IPosition): void;
        /**
         * Scroll vertically or horizontally as necessary and reveal a position centered vertically.
         */
        revealPositionInCenter(position: IPosition): void;
        /**
         * Scroll vertically or horizontally as necessary and reveal a position centered vertically only if it lies outside the viewport.
         */
        revealPositionInCenterIfOutsideViewport(position: IPosition): void;
        /**
         * Returns the primary selection of the editor.
         */
        getSelection(): IEditorSelection;
        /**
         * Returns all the selections of the editor.
         */
        getSelections(): IEditorSelection[];
        /**
         * Set the primary selection of the editor. This will remove any secondary cursors.
         * @param selection The new selection
         */
        setSelection(selection: IRange): void;
        setSelection(selection: IEditorRange): void;
        setSelection(selection: ISelection): void;
        setSelection(selection: IEditorSelection): void;
        /**
         * Set the selections for all the cursors of the editor.
         * Cursors will be removed or added, as necessary.
         */
        setSelections(selections: ISelection[]): void;
        /**
         * Scroll vertically as necessary and reveal lines.
         */
        revealLines(startLineNumber: number, endLineNumber: number): void;
        /**
         * Scroll vertically as necessary and reveal lines centered vertically.
         */
        revealLinesInCenter(lineNumber: number, endLineNumber: number): void;
        /**
         * Scroll vertically as necessary and reveal lines centered vertically only if it lies outside the viewport.
         */
        revealLinesInCenterIfOutsideViewport(lineNumber: number, endLineNumber: number): void;
        /**
         * Scroll vertically or horizontally as necessary and reveal a range.
         */
        revealRange(range: IRange): void;
        /**
         * Scroll vertically or horizontally as necessary and reveal a range centered vertically.
         */
        revealRangeInCenter(range: IRange): void;
        /**
         * Scroll vertically or horizontally as necessary and reveal a range centered vertically only if it lies outside the viewport.
         */
        revealRangeInCenterIfOutsideViewport(range: IRange): void;
        /**
         * Directly trigger a handler or an editor action.
         * @param source The source of the call.
         * @param handlerId The id of the handler or the id of a contribution.
         * @param payload Extra data to be sent to the handler.
         */
        trigger(source: string, handlerId: string, payload: any): void;
        /**
         * Gets the current model attached to this editor.
         */
        getModel(): IEditorModel;
        /**
         * Sets the current model attached to this editor.
         * If the previous model was created by the editor via the value key in the options
         * literal object, it will be destroyed. Otherwise, if the previous model was set
         * via setModel, or the model key in the options literal object, the previous model
         * will not be destroyed.
         * It is safe to call setModel(null) to simply detach the current model from the editor.
         */
        setModel(model: IEditorModel): void;
        /**
         * Change the decorations. All decorations added through this changeAccessor
         * will get the ownerId of the editor (meaning they will not show up in other
         * editors).
         * @see IModel.changeDecorations
         */
        changeDecorations(callback: (changeAccessor: IModelDecorationsChangeAccessor) => any): any;
    }

    export interface ICodeEditorState {
        validate(editor: ICommonCodeEditor): boolean;
    }

    export enum CodeEditorStateFlag {
        Value = 0,
        Selection = 1,
        Position = 2,
        Scroll = 3,
    }

    /**
     * An editor contribution that gets created every time a new editor gets created and gets disposed when the editor gets disposed.
     */
    export interface IEditorContribution {
        /**
         * Get a unique identifier for this contribution.
         */
        getId(): string;
        /**
         * Dispose this contribution.
         */
        dispose(): void;
        /**
         * Store view state.
         */
        saveViewState?(): any;
        /**
         * Restore view state.
         */
        restoreViewState?(state: any): void;
    }

    export interface IThemeDecorationRenderOptions {
        backgroundColor?: string;
        outlineColor?: string;
        outlineStyle?: string;
        outlineWidth?: string;
        borderColor?: string;
        borderRadius?: string;
        borderSpacing?: string;
        borderStyle?: string;
        borderWidth?: string;
        textDecoration?: string;
        cursor?: string;
        color?: string;
        letterSpacing?: string;
        gutterIconPath?: string;
        overviewRulerColor?: string;
    }

    export interface IDecorationRenderOptions extends IThemeDecorationRenderOptions {
        isWholeLine?: boolean;
        overviewRulerLane?: OverviewRulerLane;
        light?: IThemeDecorationRenderOptions;
        dark?: IThemeDecorationRenderOptions;
    }

    export interface IRangeWithMessage {
        range: IRange;
        hoverMessage?: IHTMLContentElement[];
    }

    export interface ICommonCodeEditor extends IEditor {
        /**
         * Returns true if this editor or one of its widgets has keyboard focus.
         */
        hasWidgetFocus(): boolean;
        /**
         * Get a contribution of this editor.
         * @id Unique identifier of the contribution.
         * @return The contribution or null if contribution not found.
         */
        getContribution(id: string): IEditorContribution;
        captureState(...flags: CodeEditorStateFlag[]): ICodeEditorState;
        /**
         * Type the getModel() of IEditor.
         */
        getModel(): IModel;
        /**
         * Returns the current editor's configuration
         */
        getConfiguration(): InternalEditorOptions;
        /**
         * Returns the 'raw' editor's configuration, as it was applied over the defaults, but without any computed members.
         */
        getRawConfiguration(): IEditorOptions;
        /**
         * Get value of the current model attached to this editor.
         * @see IModel.getValue
         */
        getValue(options?: {
            preserveBOM: boolean;
            lineEnding: string;
        }): string;
        /**
         * Set the value of the current model attached to this editor.
         * @see IModel.setValue
         */
        setValue(newValue: string): void;
        /**
         * Get the scrollWidth of the editor's viewport.
         */
        getScrollWidth(): number;
        /**
         * Get the scrollLeft of the editor's viewport.
         */
        getScrollLeft(): number;
        /**
         * Get the scrollHeight of the editor's viewport.
         */
        getScrollHeight(): number;
        /**
         * Get the scrollTop of the editor's viewport.
         */
        getScrollTop(): number;
        /**
         * Change the scrollLeft of the editor's viewport.
         */
        setScrollLeft(newScrollLeft: number): void;
        /**
         * Change the scrollTop of the editor's viewport.
         */
        setScrollTop(newScrollTop: number): void;
        /**
         * Change the scroll position of the editor's viewport.
         */
        setScrollPosition(position: INewScrollPosition): void;
        /**
         * Get an action that is a contribution to this editor.
         * @id Unique identifier of the contribution.
         * @return The action or null if action not found.
         */
        getAction(id: string): IAction;
        /**
         * Execute a command on the editor.
         * @param source The source of the call.
         * @param command The command to execute
         */
        executeCommand(source: string, command: ICommand): void;
        /**
         * Execute a command on the editor.
         * @param source The source of the call.
         * @param command The command to execute
         */
        executeEdits(source: string, edits: IIdentifiedSingleEditOperation[]): boolean;
        /**
         * Execute multiple (concommitent) commands on the editor.
         * @param source The source of the call.
         * @param command The commands to execute
         */
        executeCommands(source: string, commands: ICommand[]): void;
        /**
         * Get all the decorations on a line (filtering out decorations from other editors).
         */
        getLineDecorations(lineNumber: number): IModelDecoration[];
        /**
         * All decorations added through this call wii get the ownerId of this editor.
         * @see IModel.deltaDecorations
         */
        deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[]): string[];
        setDecorations(decorationTypeKey: string, ranges: IRangeWithMessage[]): void;
        removeDecorations(decorationTypeKey: string): void;
        /**
         * Get the layout info for the editor.
         */
        getLayoutInfo(): EditorLayoutInfo;
        /**
         * Prevent the editor from sending a widgetFocusLost event,
         * set it in a state where it believes that focus is in one of its widgets.
         * Use this method with care and always add a matching `endForcedWidgetFocus`
         */
        beginForcedWidgetFocus(): void;
        /**
         * End the preventing of sending a widgetFocusLost event.
         */
        endForcedWidgetFocus(): void;
        /**
         * This listener is notified when a keypress produces a visible character.
         * The callback should not do operations on the view, as the view might not be updated to reflect previous typed characters.
         * @param character Character to listen to.
         * @param callback Function to call when `character` is typed.
         */
        addTypingListener(character: string, callback: () => void): ListenerUnbind;
    }

    export interface ICommonDiffEditor extends IEditor {
        /**
         * Type the getModel() of IEditor.
         */
        getModel(): IDiffEditorModel;
        getOriginalEditor(): ICommonCodeEditor;
        getModifiedEditor(): ICommonCodeEditor;
        getLineChanges(): ILineChange[];
        /**
         * Get information based on computed diff about a line number from the original model.
         * If the diff computation is not finished or the model is missing, will return null.
         */
        getDiffLineInformationForOriginal(lineNumber: number): IDiffLineInformation;
        /**
         * Get information based on computed diff about a line number from the modified model.
         * If the diff computation is not finished or the model is missing, will return null.
         */
        getDiffLineInformationForModified(lineNumber: number): IDiffLineInformation;
        /**
         * @see ICodeEditor.getValue
         */
        getValue(options?: {
            preserveBOM: boolean;
            lineEnding: string;
        }): string;
        /**
         * Returns whether the diff editor is ignoring trim whitespace or not.
         */
        ignoreTrimWhitespace: boolean;
        /**
         * Returns whether the diff editor is rendering side by side or not.
         */
        renderSideBySide: boolean;
    }

    export var EditorType: {
        ICodeEditor: string;
        IDiffEditor: string;
    };

    export var ClassName: {
        EditorWarningDecoration: string;
        EditorErrorDecoration: string;
    };

    export var EventType: {
        Disposed: string;
        ConfigurationChanged: string;
        ModelDispose: string;
        ModelChanged: string;
        ModelTokensChanged: string;
        ModelModeChanged: string;
        ModelModeSupportChanged: string;
        ModelOptionsChanged: string;
        ModelContentChanged: string;
        ModelContentChanged2: string;
        ModelContentChangedFlush: string;
        ModelContentChangedLinesDeleted: string;
        ModelContentChangedLinesInserted: string;
        ModelContentChangedLineChanged: string;
        EditorTextBlur: string;
        EditorTextFocus: string;
        EditorFocus: string;
        EditorBlur: string;
        ModelDecorationsChanged: string;
        CursorPositionChanged: string;
        CursorSelectionChanged: string;
        CursorRevealRange: string;
        CursorScrollRequest: string;
        ViewFocusGained: string;
        ViewFocusLost: string;
        ViewFocusChanged: string;
        ViewScrollChanged: string;
        ViewZonesChanged: string;
        ViewLayoutChanged: string;
        ContextMenu: string;
        MouseDown: string;
        MouseUp: string;
        MouseMove: string;
        MouseLeave: string;
        KeyDown: string;
        KeyUp: string;
        EditorLayout: string;
        DiffUpdated: string;
    };

    export var Handler: {
        ExecuteCommand: string;
        ExecuteCommands: string;
        CursorLeft: string;
        CursorLeftSelect: string;
        CursorWordLeft: string;
        CursorWordStartLeft: string;
        CursorWordEndLeft: string;
        CursorWordLeftSelect: string;
        CursorWordStartLeftSelect: string;
        CursorWordEndLeftSelect: string;
        CursorRight: string;
        CursorRightSelect: string;
        CursorWordRight: string;
        CursorWordStartRight: string;
        CursorWordEndRight: string;
        CursorWordRightSelect: string;
        CursorWordStartRightSelect: string;
        CursorWordEndRightSelect: string;
        CursorUp: string;
        CursorUpSelect: string;
        CursorDown: string;
        CursorDownSelect: string;
        CursorPageUp: string;
        CursorPageUpSelect: string;
        CursorPageDown: string;
        CursorPageDownSelect: string;
        CursorHome: string;
        CursorHomeSelect: string;
        CursorEnd: string;
        CursorEndSelect: string;
        ExpandLineSelection: string;
        CursorTop: string;
        CursorTopSelect: string;
        CursorBottom: string;
        CursorBottomSelect: string;
        CursorColumnSelectLeft: string;
        CursorColumnSelectRight: string;
        CursorColumnSelectUp: string;
        CursorColumnSelectPageUp: string;
        CursorColumnSelectDown: string;
        CursorColumnSelectPageDown: string;
        AddCursorDown: string;
        AddCursorUp: string;
        CursorUndo: string;
        MoveTo: string;
        MoveToSelect: string;
        ColumnSelect: string;
        CreateCursor: string;
        LastCursorMoveToSelect: string;
        JumpToBracket: string;
        Type: string;
        ReplacePreviousChar: string;
        Paste: string;
        Tab: string;
        Indent: string;
        Outdent: string;
        DeleteLeft: string;
        DeleteRight: string;
        DeleteWordLeft: string;
        DeleteWordStartLeft: string;
        DeleteWordEndLeft: string;
        DeleteWordRight: string;
        DeleteWordStartRight: string;
        DeleteWordEndRight: string;
        DeleteAllLeft: string;
        DeleteAllRight: string;
        RemoveSecondaryCursors: string;
        CancelSelection: string;
        Cut: string;
        Undo: string;
        Redo: string;
        WordSelect: string;
        WordSelectDrag: string;
        LastCursorWordSelect: string;
        LineSelect: string;
        LineSelectDrag: string;
        LastCursorLineSelect: string;
        LastCursorLineSelectDrag: string;
        LineInsertBefore: string;
        LineInsertAfter: string;
        LineBreakInsert: string;
        SelectAll: string;
        ScrollLineUp: string;
        ScrollLineDown: string;
        ScrollPageUp: string;
        ScrollPageDown: string;
    };

    export enum TextEditorCursorStyle {
        Line = 1,
        Block = 2,
        Underline = 3,
    }

    export function cursorStyleToString(cursorStyle: TextEditorCursorStyle): string;

    export interface IContentWidgetData {
        widget: IContentWidget;
        position: IContentWidgetPosition;
    }

    export interface IOverlayWidgetData {
        widget: IOverlayWidget;
        position: IOverlayWidgetPosition;
    }

    export interface ICodeEditorHelper {
        getScrollWidth(): number;
        getScrollLeft(): number;
        getScrollHeight(): number;
        getScrollTop(): number;
        setScrollPosition(position: INewScrollPosition): void;
        getVerticalOffsetForPosition(lineNumber: number, column: number): number;
        delegateVerticalScrollbarMouseDown(browserEvent: MouseEvent): void;
        getOffsetForColumn(lineNumber: number, column: number): number;
    }

    export interface IView extends IDisposable {
        domNode: HTMLElement;
        getInternalEventBus(): IEventEmitter;
        createOverviewRuler(cssClassName: string, minimumHeight: number, maximumHeight: number): IOverviewRuler;
        getCodeEditorHelper(): ICodeEditorHelper;
        getCenteredRangeInViewport(): IEditorRange;
        change(callback: (changeAccessor: IViewZoneChangeAccessor) => any): boolean;
        getWhitespaces(): IEditorWhitespace[];
        renderOnce(callback: () => any): any;
        render(now: boolean, everything: boolean): void;
        setAriaActiveDescendant(id: string): void;
        focus(): void;
        isFocused(): boolean;
        saveState(): IViewState;
        restoreState(state: IViewState): void;
        addContentWidget(widgetData: IContentWidgetData): void;
        layoutContentWidget(widgetData: IContentWidgetData): void;
        removeContentWidget(widgetData: IContentWidgetData): void;
        addOverlayWidget(widgetData: IOverlayWidgetData): void;
        layoutOverlayWidget(widgetData: IOverlayWidgetData): void;
        removeOverlayWidget(widgetData: IOverlayWidgetData): void;
    }

    export interface IViewZoneData {
        viewZoneId: number;
        positionBefore: IEditorPosition;
        positionAfter: IEditorPosition;
        position: IEditorPosition;
        afterLineNumber: number;
    }

    export interface IMouseDispatchData {
        position: IEditorPosition;
        /**
         * Desired mouse column (e.g. when position.column gets clamped to text length -- clicking after text on a line).
         */
        mouseColumn: number;
        startedOnLineNumbers: boolean;
        inSelectionMode: boolean;
        mouseDownCount: number;
        altKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
    }

    export interface IViewController {
        dispatchMouse(data: IMouseDispatchData): any;
        moveTo(source: string, position: IEditorPosition): void;
        paste(source: string, text: string, pasteOnNewLine: boolean): void;
        type(source: string, text: string): void;
        replacePreviousChar(source: string, text: string, replaceCharCnt: number): void;
        cut(source: string): void;
        emitKeyDown(e: IKeyboardEvent): void;
        emitKeyUp(e: IKeyboardEvent): void;
        emitContextMenu(e: IEditorMouseEvent): void;
        emitMouseMove(e: IEditorMouseEvent): void;
        emitMouseLeave(e: IEditorMouseEvent): void;
        emitMouseUp(e: IEditorMouseEvent): void;
        emitMouseDown(e: IEditorMouseEvent): void;
    }

    export var ClassNames: {
        TEXTAREA_COVER: string;
        TEXTAREA: string;
        LINES_CONTENT: string;
        OVERFLOW_GUARD: string;
        VIEW_LINES: string;
        VIEW_LINE: string;
        SCROLLABLE_ELEMENT: string;
        CONTENT_WIDGETS: string;
        OVERFLOWING_CONTENT_WIDGETS: string;
        OVERLAY_WIDGETS: string;
        MARGIN_VIEW_OVERLAYS: string;
        LINE_NUMBERS: string;
        GLYPH_MARGIN: string;
        SCROLL_DECORATION: string;
        VIEW_CURSORS_LAYER: string;
        VIEW_ZONES: string;
    };

    export interface IViewportInfo {
        visibleRange: IEditorRange;
        width: number;
        height: number;
        deltaTop: number;
        deltaLeft: number;
    }

    /**
     * A view zone is a full horizontal rectangle that 'pushes' text down.
     * The editor reserves space for view zones when rendering.
     */
    export interface IViewZone {
        /**
         * The line number after which this zone should appear.
         * Use 0 to place a view zone before the first line number.
         */
        afterLineNumber: number;
        /**
         * The column after which this zone should appear.
         * If not set, the maxLineColumn of `afterLineNumber` will be used.
         */
        afterColumn?: number;
        /**
         * Suppress mouse down events.
         * If set, the editor will attach a mouse down listener to the view zone and .preventDefault on it.
         * Defaults to false
         */
        suppressMouseDown?: boolean;
        /**
         * The height in lines of the view zone.
         * If specified, `heightInPx` will be used instead of this.
         * If neither `heightInPx` nor `heightInLines` is specified, a default of `heightInLines` = 1 will be chosen.
         */
        heightInLines?: number;
        /**
         * The height in px of the view zone.
         * If this is set, the editor will give preference to it rather than `heightInLines` above.
         * If neither `heightInPx` nor `heightInLines` is specified, a default of `heightInLines` = 1 will be chosen.
         */
        heightInPx?: number;
        /**
         * The dom node of the view zone
         */
        domNode: HTMLElement;
        /**
         * Callback which gives the relative top of the view zone as it appears (taking scrolling into account).
         */
        onDomNodeTop?: (top: number) => void;
        /**
         * Callback which gives the height in pixels of the view zone.
         */
        onComputedHeight?: (height: number) => void;
    }

    /**
     * An accessor that allows for zones to be added or removed.
     */
    export interface IViewZoneChangeAccessor {
        /**
         * Create a new view zone.
         * @param zone Zone to create
         * @return A unique identifier to the view zone.
         */
        addZone(zone: IViewZone): number;
        /**
         * Remove a zone
         * @param id A unique identifier to the view zone, as returned by the `addZone` call.
         */
        removeZone(id: number): void;
        /**
         * Change a zone's position.
         * The editor will rescan the `afterLineNumber` and `afterColumn` properties of a view zone.
         */
        layoutZone(id: number): void;
    }

    /**
     * A positioning preference for rendering content widgets.
     */
    export enum ContentWidgetPositionPreference {
        /**
         * Place the content widget exactly at a position
         */
        EXACT = 0,
        /**
         * Place the content widget above a position
         */
        ABOVE = 1,
        /**
         * Place the content widget below a position
         */
        BELOW = 2,
    }

    /**
     * A position for rendering content widgets.
     */
    export interface IContentWidgetPosition {
        /**
         * Desired position for the content widget.
         * `preference` will also affect the placement.
         */
        position: IPosition;
        /**
         * Placement preference for position, in order of preference.
         */
        preference: ContentWidgetPositionPreference[];
    }

    /**
     * A content widget renders inline with the text and can be easily placed 'near' an editor position.
     */
    export interface IContentWidget {
        /**
         * Render this content widget in a location where it could overflow the editor's view dom node.
         */
        allowEditorOverflow?: boolean;
        /**
         * Get a unique identifier of the content widget.
         */
        getId(): string;
        /**
         * Get the dom node of the content widget.
         */
        getDomNode(): HTMLElement;
        /**
         * Get the placement of the content widget.
         * If null is returned, the content widget will be placed off screen.
         */
        getPosition(): IContentWidgetPosition;
    }

    /**
     * A positioning preference for rendering overlay widgets.
     */
    export enum OverlayWidgetPositionPreference {
        /**
         * Position the overlay widget in the top right corner
         */
        TOP_RIGHT_CORNER = 0,
        /**
         * Position the overlay widget in the bottom right corner
         */
        BOTTOM_RIGHT_CORNER = 1,
        /**
         * Position the overlay widget in the top center
         */
        TOP_CENTER = 2,
    }

    /**
     * A position for rendering overlay widgets.
     */
    export interface IOverlayWidgetPosition {
        /**
         * The position preference for the overlay widget.
         */
        preference: OverlayWidgetPositionPreference;
    }

    /**
     * An overlay widgets renders on top of the text.
     */
    export interface IOverlayWidget {
        /**
         * Get a unique identifier of the overlay widget.
         */
        getId(): string;
        /**
         * Get the dom node of the overlay widget.
         */
        getDomNode(): HTMLElement;
        /**
         * Get the placement of the overlay widget.
         * If null is returned, the overlay widget is responsible to place itself.
         */
        getPosition(): IOverlayWidgetPosition;
    }

    /**
     * Target hit with the mouse in the editor.
     */
    export interface IMouseTarget {
        /**
         * The target element
         */
        element: Element;
        /**
         * The target type
         */
        type: MouseTargetType;
        /**
         * The 'approximate' editor position
         */
        position: IEditorPosition;
        /**
         * Desired mouse column (e.g. when position.column gets clamped to text length -- clicking after text on a line).
         */
        mouseColumn: number;
        /**
         * The 'approximate' editor range
         */
        range: IEditorRange;
        /**
         * Some extra detail.
         */
        detail: any;
    }

    /**
     * A mouse event originating from the editor.
     */
    export interface IEditorMouseEvent {
        event: IMouseEvent;
        target: IMouseTarget;
    }

    export type ISimpleEditorContributionCtor = IConstructorSignature1<ICodeEditor, IEditorContribution>;

    /**
     * An editor contribution descriptor that will be used to construct editor contributions
     */
    export interface IEditorContributionDescriptor {
        /**
         * Create an instance of the contribution
         */
        createInstance(instantiationService: IInstantiationService, editor: ICodeEditor): IEditorContribution;
    }

    export class ColorZone {
        _colorZoneBrand: void;
        from: number;
        to: number;
        colorId: number;
        position: OverviewRulerLane;
        constructor(from: number, to: number, colorId: number, position: OverviewRulerLane);
    }

    /**
     * A zone in the overview ruler
     */
    export class OverviewRulerZone {
        _overviewRulerZoneBrand: void;
        startLineNumber: number;
        endLineNumber: number;
        position: OverviewRulerLane;
        forceHeight: number;
        private _color;
        private _darkColor;
        private _colorZones;
        constructor(startLineNumber: number, endLineNumber: number, position: OverviewRulerLane, forceHeight: number, color: string, darkColor: string);
        getColor(useDarkColor: boolean): string;
        equals(other: OverviewRulerZone): boolean;
        compareTo(other: OverviewRulerZone): number;
        setColorZones(colorZones: ColorZone[]): void;
        getColorZones(): ColorZone[];
    }

    /**
     * An overview ruler
     */
    export interface IOverviewRuler {
        getDomNode(): HTMLElement;
        dispose(): void;
        setZones(zones: OverviewRulerZone[]): void;
        setLayout(position: OverviewRulerPosition): void;
    }

    /**
     * A rich code editor.
     */
    export interface ICodeEditor extends ICommonCodeEditor {
        /**
         * Returns the editor's dom node
         */
        getDomNode(): HTMLElement;
        /**
         * Add a content widget. Widgets must have unique ids, otherwise they will be overwritten.
         */
        addContentWidget(widget: IContentWidget): void;
        /**
         * Layout/Reposition a content widget. This is a ping to the editor to call widget.getPosition()
         * and update appropiately.
         */
        layoutContentWidget(widget: IContentWidget): void;
        /**
         * Remove a content widget.
         */
        removeContentWidget(widget: IContentWidget): void;
        /**
         * Add an overlay widget. Widgets must have unique ids, otherwise they will be overwritten.
         */
        addOverlayWidget(widget: IOverlayWidget): void;
        /**
         * Layout/Reposition an overlay widget. This is a ping to the editor to call widget.getPosition()
         * and update appropiately.
         */
        layoutOverlayWidget(widget: IOverlayWidget): void;
        /**
         * Remove an overlay widget.
         */
        removeOverlayWidget(widget: IOverlayWidget): void;
        /**
         * Change the view zones. View zones are lost when a new model is attached to the editor.
         */
        changeViewZones(callback: (accessor: IViewZoneChangeAccessor) => void): void;
        /**
         * Returns the range that is currently centered in the view port.
         */
        getCenteredRangeInViewport(): IEditorRange;
        /**
         * Get the view zones.
         */
        getWhitespaces(): IEditorWhitespace[];
        /**
         * Get the horizontal position (left offset) for the column w.r.t to the beginning of the line.
         * This method works only if the line `lineNumber` is currently rendered (in the editor's viewport).
         * Use this method with caution.
         */
        getOffsetForColumn(lineNumber: number, column: number): number;
        /**
         * Force an editor render now.
         */
        render(): void;
        /**
         * Get the vertical position (top offset) for the line w.r.t. to the first line.
         */
        getTopForLineNumber(lineNumber: number): number;
        /**
         * Get the vertical position (top offset) for the position w.r.t. to the first line.
         */
        getTopForPosition(lineNumber: number, column: number): number;
        /**
         * Get the visible position for `position`.
         * The result position takes scrolling into account and is relative to the top left corner of the editor.
         * Explanation 1: the results of this method will change for the same `position` if the user scrolls the editor.
         * Explanation 2: the results of this method will not change if the container of the editor gets repositioned.
         * Warning: the results of this method are innacurate for positions that are outside the current editor viewport.
         */
        getScrolledVisiblePosition(position: IPosition): {
            top: number;
            left: number;
            height: number;
        };
        /**
         * Set the model ranges that will be hidden in the view.
         */
        setHiddenAreas(ranges: IRange[]): void;
        setAriaActiveDescendant(id: string): void;
        /**
         * Apply the same font settings as the editor to `target`.
         */
        applyFontInfo(target: HTMLElement): void;
    }

    /**
     * A rich diff editor.
     */
    export interface IDiffEditor extends ICommonDiffEditor {
        /**
         * @see ICodeEditor.getDomNode
         */
        getDomNode(): HTMLElement;
    }

}