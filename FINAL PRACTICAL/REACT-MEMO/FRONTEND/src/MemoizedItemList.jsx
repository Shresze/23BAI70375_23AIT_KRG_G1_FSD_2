import { memo } from "react";

function ItemList({ items }) {
  console.log("ItemList render: this should log only once on initial mount.");

  return (
    <ul style={{ maxHeight: "350px", overflowY: "auto", paddingLeft: "1.2rem" }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const MemoizedItemList = memo(ItemList);

export default MemoizedItemList;
