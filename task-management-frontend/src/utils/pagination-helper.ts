export default function paginationHelper(keyArgs?: any, concatenateNodes: boolean = false) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs: keyArgs,
    // read: function (existing, { args: { limit = existing.length } }) {
    //   if (existing && existing.nodes.length > limit) {
    //     return {
    //       nodes: [...existing.nodes].splice(limit - 1),
    //       pageInfo: {
    //         ...existing.pageInfo,
    //         cursor: existing.nodes.find((_, i) => i === limit - 1).cursor,
    //       },
    //     };
    //   }
    // },
    merge: function (existing: any, incoming: any) {
      if (!existing) {
        existing = makeEmptyData();
      }

      if (!incoming) {
        return existing;
      }

      // If cursor is the same, don't update (duplicate request)
      if (existing.pageInfo?.cursor === incoming.pageInfo?.cursor) {
        return existing;
      }

      // If concatenateNodes is true, check if it's a refetch or fetchMore
      if (concatenateNodes) {
        // If no cursor in incoming or cursor hasn't changed, it's a refetch/first load
        if (!incoming.pageInfo?.cursor || !existing.pageInfo?.cursor) {
          return {
            nodes: incoming.nodes,
            pageInfo: incoming.pageInfo,
            statistics: incoming.statistics || existing.statistics,
          };
        }

        // It's a fetchMore, concatenate nodes
        return {
          nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
          pageInfo: incoming.pageInfo,
          statistics: incoming.statistics || existing.statistics,
        };
      }

      // Default behavior: replace nodes
      return {
        nodes: incoming.nodes,
        pageInfo: { ...existing.pageInfo, ...incoming.pageInfo },
        statistics: { ...existing.statistics, ...incoming.statistics },
      };
    },
  };
}

function makeEmptyData() {
  return {
    nodes: [],
    pageInfo: {
      cursor: '',
    },
  };
}
