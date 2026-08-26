# @repo/ui component contracts

## Badge

`Badge` communicates a passive status. Its supported tones are `info`, `success`,
`warning`, and `destructive`; each consumes a semantic surface and foreground token.
Those tokens are defined for both light and dark themes and provide the status-text
contrast contract. Badge intentionally has no interactive or focusable API.

## StatCard

`StatCard` presents one compact metric through its required `title` and `value`.
It intentionally excludes trends, charts, and loading states. Loading belongs to a
generic `Skeleton` primitive at the product boundary, rather than per-card loading UI;
there is deliberately no StatCard loading prop or variant.

The overflow action is hidden unless `action` is supplied. To display one, supply
an accessible `label` and `onClick` callback:

```tsx
<StatCard
  title="Total products"
  value="1,248"
  action={{ label: "View total products", onClick: handleViewProducts }}
/>
```
