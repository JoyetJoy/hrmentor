export const Icon = ({ svg, color }) => (
  <div dangerouslySetInnerHTML={{ __html: svg }} style={{ color }} />
);
