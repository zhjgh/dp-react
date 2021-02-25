export const imports = {
  'src/components/Home/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-home-index" */ 'src/components/Home/index.mdx'
    ),
  'src/components/SearchGroup/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-search-group-index" */ 'src/components/SearchGroup/index.mdx'
    ),
  'src/components/Table/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-table-index" */ 'src/components/Table/index.mdx'
    ),
}
