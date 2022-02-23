export interface KeyValue {
  key: any;
  value: any;
}

const FormHelperService = {
  mapToKeyValue: function (map: Map<any, any>): KeyValue[] {
    return [...map.keys()].map((k) => {
      return {
        key: k,
        value: map.get(k),
      };
    });
  },
};
