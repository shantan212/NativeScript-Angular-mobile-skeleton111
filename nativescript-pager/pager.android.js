"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var common = require("./pager.common");
var pager_common_1 = require("./pager.common");
global.moduleMerge(common, exports);
function notifyForItemAtIndex(owner, nativeView, view, eventName, index) {
    var args = {
        eventName: eventName,
        object: owner,
        index: index,
        view: view,
        ios: undefined,
        android: nativeView
    };
    owner.notify(args);
    return args;
}
var Pager = (function (_super) {
    __extends(Pager, _super);
    function Pager() {
        var _this = _super.call(this) || this;
        _this._realizedItems = new Map();
        _this._realizedTemplates = new Map();
        return _this;
    }
    Pager.prototype.itemTemplateUpdated = function (oldData, newData) {
    };
    Object.defineProperty(Pager.prototype, "views", {
        get: function () {
            return this._views;
        },
        set: function (value) {
            this._views = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Pager.prototype.createNativeView = function () {
        var that = new WeakRef(this);
        this._viewMap = new Map();
        this._android = new TNSViewPager(this._context, that);
        this._pageListener = new android.support.v4.view.ViewPager.OnPageChangeListener({
            onPageSelected: function (position) {
                var owner = that.get();
                if (owner) {
                    owner.selectedIndex = position;
                }
            },
            onPageScrolled: function (position, positionOffset, positionOffsetPixels) {
            },
            onPageScrollStateChanged: function (state) {
            }
        });
        this._pagerAdapter = new PagerAdapter(this);
        if (this.transformer) {
            this._android.setPageTransformer(false, new this._transformer());
        }
        if (this.pagesCount > 0) {
            this._android.setOffscreenPageLimit(this.pagesCount);
        }
        this._android.setClipToPadding(false);
        if (this.pageSpacing) {
            this._android.setPageMargin(this.pageSpacing);
        }
        return this._android;
    };
    Pager.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this._android.setOnPageChangeListener(this._pageListener);
        this._android.setAdapter(this._pagerAdapter);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this.nativeView.setId(this._androidViewId);
    };
    Object.defineProperty(Pager.prototype, "disableAnimation", {
        get: function () {
            return this._disableAnimation;
        },
        set: function (value) {
            this._disableAnimation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "pagerAdapter", {
        get: function () {
            return this._pagerAdapter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "_childrenCount", {
        get: function () {
            return this.items ? this.items.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Pager.prototype[pager_common_1.itemsProperty.getDefault] = function () {
        return null;
    };
    Pager.prototype[pager_common_1.itemsProperty.setNative] = function (value) {
        if (value) {
            pager_common_1.selectedIndexProperty.coerce(this);
            this.refresh();
        }
    };
    Pager.prototype[pager_common_1.selectedIndexProperty.setNative] = function (value) {
        if (this._android) {
            this._android.setCurrentItem(value, !this.disableAnimation);
        }
    };
    Pager.prototype.refresh = function (hardReset) {
        if (hardReset === void 0) { hardReset = false; }
        if (this._android && this._pagerAdapter) {
            this._pagerAdapter.notifyDataSetChanged();
        }
    };
    Pager.prototype.updatePagesCount = function (value) {
        if (this._android) {
            this._pagerAdapter.notifyDataSetChanged();
            this._android.setOffscreenPageLimit(value);
        }
    };
    Pager.prototype.updateNativeIndex = function (oldIndex, newIndex) {
    };
    Pager.prototype.updateNativeItems = function (oldItems, newItems) {
        this.refresh();
    };
    Pager.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
    };
    Pager.prototype.disposeNativeView = function () {
        this._viewMap.clear();
        _super.prototype.disposeNativeView.call(this);
    };
    Pager.prototype.eachChildView = function (callback) {
        if (this._viewMap && this._viewMap.size > 0) {
            this._viewMap.forEach(function (view, key) {
                callback(view);
            });
        }
    };
    Object.defineProperty(Pager.prototype, "transformer", {
        get: function () {
            return this._transformer;
        },
        set: function (value) {
            switch (value) {
                case 'AccordionTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.AccordionTransformer;
                    break;
                case 'BackgroundToForegroundTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.BackgroundToForegroundTransformer;
                    break;
                case 'CubeInTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.CubeInTransformer;
                    break;
                case 'CubeOutTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.CubeOutTransformer;
                    break;
                case 'DefaultTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.DefaultTransformer;
                    break;
                case 'DepthPageTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.DepthPageTransformer;
                    break;
                case 'DrawFromBackTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.DrawFromBackTransformer;
                    break;
                case 'FlipHorizontalTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.FlipHorizontalTransformer;
                    break;
                case 'FlipVerticalTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.FlipVerticalTransformer;
                    break;
                case 'ForegroundToBackgroundTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.ForegroundToBackgroundTransformer;
                    break;
                case 'RotateDownTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.RotateDownTransformer;
                    break;
                case 'RotateUpTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.RotateUpTransformer;
                    break;
                case 'StackTransformer':
                    this._transformer = com.eftimoff.viewpagertransformers.StackTransformer;
                    break;
                case 'TabletTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.TabletTransformer;
                    break;
                case 'ZoomInTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.ZoomInTransformer;
                    break;
                case 'ZoomOutSlideTransformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.ZoomOutSlideTransformer;
                    break;
                case 'ZoomOutTranformer':
                    this._transformer =
                        com.eftimoff.viewpagertransformers.ZoomOutTranformer;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Pager.prototype.updateAdapter = function () {
        this._pagerAdapter.notifyDataSetChanged();
    };
    Pager.prototype._selectedIndexUpdatedFromNative = function (newIndex) {
    };
    Pager.prototype[pager_common_1.itemTemplatesProperty.getDefault] = function () {
        return null;
    };
    Pager.prototype[pager_common_1.itemTemplatesProperty.setNative] = function (value) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        if (value) {
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }
        this._pagerAdapter = new PagerAdapter(this);
        this.nativeViewProtected.setAdapter(this._pagerAdapter);
        this.refresh();
    };
    return Pager;
}(pager_common_1.PagerBase));
exports.Pager = Pager;
exports.pagesCountProperty = new view_1.Property({
    name: 'pagesCount',
    valueChanged: function (pager, oldValue, newValue) {
        pager.updatePagesCount(pager.pagesCount);
    }
});
exports.pagesCountProperty.register(Pager);
var PagerAdapter = (function (_super) {
    __extends(PagerAdapter, _super);
    function PagerAdapter(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    PagerAdapter.prototype.getItemPosition = function (obj) {
        return android.support.v4.view.PagerAdapter.POSITION_NONE;
    };
    PagerAdapter.prototype.instantiateItem = function (collection, position) {
        if (!this.owner) {
            return null;
        }
        if (position === this.owner.items.length - 1) {
            this.owner.notify({ eventName: pager_common_1.LOADMOREITEMS, object: this.owner });
        }
        var template = this.owner._getItemTemplate(position);
        if (this.owner._viewMap.has(position + "-" + template.key)) {
            var cachedView = this.owner._viewMap.get(position + "-" + template.key);
            var convertView = cachedView ? cachedView.nativeView : null;
            if (convertView) {
                return convertView;
            }
        }
        var view = template.createView();
        var _args = notifyForItemAtIndex(this.owner, view ? view.nativeView : null, view, pager_common_1.ITEMLOADING, position);
        view = _args.view || this.owner._getDefaultItemContent(position);
        if (view) {
            this.owner._prepareItem(view, position);
            if (!view.parent) {
                this.owner._addView(view);
            }
            this.owner._viewMap.set(position + "-" + template.key, view);
        }
        collection.addView(view.nativeView);
        return view.nativeView;
    };
    PagerAdapter.prototype.destroyItem = function (collection, position, object) {
        var template = this.owner._getItemTemplate(position);
        if (this.owner._viewMap.has(position + "-" + template.key)) {
            var convertView = this.owner._viewMap.get(position + "-" + template.key)
                ? this.owner._viewMap.get(position + "-" + template.key)
                : null;
            if (convertView && convertView.nativeView) {
                collection.removeView(convertView.nativeView);
                this.owner._viewMap.delete(position + "-" + template.key);
            }
        }
    };
    PagerAdapter.prototype.getCount = function () {
        return this.owner.items ? this.owner.items.length : 0;
    };
    PagerAdapter.prototype.isViewFromObject = function (view, object) {
        return view === object;
    };
    return PagerAdapter;
}(android.support.v4.view.PagerAdapter));
exports.PagerAdapter = PagerAdapter;
var TNSViewPager = (function (_super) {
    __extends(TNSViewPager, _super);
    function TNSViewPager(context, owner) {
        var _this = _super.call(this, context) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    TNSViewPager.prototype.onInterceptTouchEvent = function (ev) {
        var owner = this.owner.get();
        var disableSwipe = owner.disableSwipe;
        if (disableSwipe) {
            return false;
        }
        else {
            try {
                return _super.prototype.onInterceptTouchEvent.call(this, ev);
            }
            catch (e) {
                return false;
            }
        }
    };
    TNSViewPager.prototype.onTouchEvent = function (ev) {
        var owner = this.owner.get();
        var disableSwipe = owner.disableSwipe;
        if (disableSwipe) {
            return false;
        }
        else {
            return _super.prototype.onTouchEvent.call(this, ev);
        }
    };
    return TNSViewPager;
}(android.support.v4.view.ViewPager));
exports.TNSViewPager = TNSViewPager;
