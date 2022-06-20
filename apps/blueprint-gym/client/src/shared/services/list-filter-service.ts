import { faClockRotateLeft, faSortAlphaUpAlt } from "@fortawesome/free-solid-svg-icons";

export interface FilterConfig {
  idKey: string;
  sortByAlphKey: string;
  sortByNewestKey?: string | undefined;
  extraSortByItems?: SortByConfig[];
  filters: FilterByConfig[];
}

export interface FilterByConfig {
  filterIndex?: number;
  label?: string | undefined;
  icon: any;
  key: string;
  options: string[];
  selectType: "append" | "replace";
  activeOptions?: Set<string>;
  isVisible: (value: any, activeOptions: Set<any>) => boolean;
}

export interface SortByConfig {
  label?: string | undefined;
  icon: any;
  key: string;
  sortingFunc: (items: any[]) => any[];
}

export class ListFilterService {
  items: any[];
  filterConfig: FilterConfig;
  sortByIndexedItemMap: { [key: string]: any[] };
  activeSort: string | null;

  constructor(items: any[], filterConfig: FilterConfig) {
    this.items = items;
    this.activeSort = null;
    this.filterConfig = filterConfig;
    this.sortByIndexedItemMap = {};
    this.filterConfig.filters = this.filterConfig.filters
      .sort((x) => x.filterIndex ?? 0)
      .map((filter, ind) => ({ ...filter, filterIndex: ind }));

    this.preprocess();
  }

  public sortBy(key: string): this {
    this.activeSort = key;
    return this;
  }

  public resetSortBy(): this {
    this.activeSort = null;
    return this;
  }

  public addFilter(filterIndex: number, value: any): this {
    this.filterConfig.filters[filterIndex].activeOptions?.add(value);
    return this;
  }

  public removeFilter(filterIndex: number, value: any): this {
    this.filterConfig.filters[filterIndex].activeOptions?.delete(value);
    return this;
  }

  public removeItem(id: string): this {
    this.items = this.items.filter((x) => x[this.filterConfig.idKey] !== id);
    Object.keys(this.sortByIndexedItemMap).forEach((k) => {
      this.sortByIndexedItemMap[k] = this.sortByIndexedItemMap[k].filter((x) => x[this.filterConfig.idKey] !== id);
    });
    return this;
  }

  public search = (text: string): any[] => {
    // add debounce functionality
    return this.getSortedAndFilteredItems().filter((x) => x[this.filterConfig.sortByAlphKey].includes(text));
  };

  public getSortedAndFilteredItems = (): any[] => {
    let items: any[];
    if (this.activeSort) {
      items = this.sortByIndexedItemMap[this.activeSort];
    } else {
      items = this.items;
    }

    return items.filter((item) => {
      let passes = true;
      for (const filter of this.filterConfig.filters) {
        if (filter.activeOptions == null) {
          continue;
        }
        if (filter.isVisible(item[filter.key], filter.activeOptions)) {
          continue;
        }
        passes = false;
        break;
      }
      return passes;
    });
  };

  private preprocess() {
    const defaultConfigs: SortByConfig[] = [this.getAlphaSortByConfig()];
    if (this.filterConfig.sortByNewestKey) {
      defaultConfigs.push(this.getNewestSortByConfig());
    }

    [...defaultConfigs, ...(this.filterConfig?.extraSortByItems ?? [])].forEach((sortByConfig) => {
      this.sortByIndexedItemMap[sortByConfig.key] = sortByConfig.sortingFunc([...this.items]);
    });
  }

  private getAlphaSortByConfig = (): SortByConfig => {
    const k = this.filterConfig.sortByAlphKey;
    return {
      label: "Name",
      icon: faSortAlphaUpAlt,
      key: this.filterConfig.sortByAlphKey,
      sortingFunc: (items: any[]) => items.sort((a, b) => (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0)),
    };
  };

  private getNewestSortByConfig = (): SortByConfig => {
    return {
      label: "Newest",
      icon: faClockRotateLeft,
      key: this.filterConfig.sortByNewestKey ?? "",
      sortingFunc: (items: any[]) =>
        this.filterConfig.sortByNewestKey ? items.sort((x) => x[this.filterConfig.sortByNewestKey ?? ""]) : items,
    };
  };
}
