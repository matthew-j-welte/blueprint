export interface SelectablePillInput {
  onSelect: () => any;
  onDelete: () => any;
  selected: boolean;
  content: any;
}

function SelectablePill(props: SelectablePillInput) {
  return (
    <button
      type="button"
      key={props.content}
      onClick={() =>
        props.selected === false ? props.onSelect() : props.onDelete()
      }
      className={`pt-2 pb-1 px-5 text-center selectable-pill d-flex ${
        props.selected ? "selectable-pill-selected" : ""
      }`}
    >
      {props.content}
    </button>
  );
}

export default SelectablePill;
