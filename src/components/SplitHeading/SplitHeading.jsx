const SplitHeading = ({ as: Tag = 'h2', className = '', lead, accent }) => (
  <Tag className={className}>
    {lead}
    {lead && accent ? ' ' : null}
    {accent ? <span className="heading-accent">{accent}</span> : null}
  </Tag>
);

export default SplitHeading;
