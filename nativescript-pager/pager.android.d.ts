import { Property, View } from 'tns-core-modules/ui/core/view';
import { PagerBase } from './pager.common';
export declare class Pager extends PagerBase {
    _androidViewId: number;
    disableSwipe: boolean;
    private _disableAnimation;
    pagesCount: number;
    itemTemplateUpdated(oldData: any, newData: any): void;
    private _android;
    private _pagerAdapter;
    private _views;
    private _transformer;
    private _pageListener;
    _viewMap: Map<string, View>;
    _realizedItems: Map<android.view.View, View>;
    _realizedTemplates: Map<string, Map<android.view.View, View>>;
    constructor();
    views: Array<any>;
    readonly android: android.support.v4.view.ViewPager;
    createNativeView(): android.support.v4.view.ViewPager;
    initNativeView(): void;
    disableAnimation: boolean;
    readonly pagerAdapter: android.support.v4.view.PagerAdapter;
    readonly _childrenCount: number;
    refresh(hardReset?: boolean): void;
    updatePagesCount(value: number): void;
    updateNativeIndex(oldIndex: number, newIndex: number): void;
    updateNativeItems(oldItems: Array<View>, newItems: Array<View>): void;
    onUnloaded(): void;
    disposeNativeView(): void;
    eachChildView(callback: (child: View) => boolean): void;
    transformer: any;
    updateAdapter(): void;
    _selectedIndexUpdatedFromNative(newIndex: number): void;
}
export declare const pagesCountProperty: Property<Pager, number>;
export declare class PagerAdapter extends android.support.v4.view.PagerAdapter {
    private owner;
    constructor(owner: any);
    getItemPosition(obj: any): number;
    instantiateItem(collection: android.view.ViewGroup, position: number): any;
    destroyItem(collection: android.view.ViewGroup, position: number, object: any): void;
    getCount(): any;
    isViewFromObject(view: android.view.View, object: any): boolean;
}
export declare class TNSViewPager extends android.support.v4.view.ViewPager {
    disableSwipe: boolean;
    owner: WeakRef<Pager>;
    constructor(context: any, owner: WeakRef<Pager>);
    onInterceptTouchEvent(ev: any): boolean;
    onTouchEvent(ev: any): boolean;
}
