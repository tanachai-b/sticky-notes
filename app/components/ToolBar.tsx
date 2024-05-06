import { Icon, IconButton } from "./common";

export function ToolBar({
  className,
  onTodayClicked,
}: {
  className?: string;
  onTodayClicked: () => void;
}) {
  return (
    <div className={`flex flex-wrap px-2.5 ${className}`}>
      <IconButton
        icon={<Icon className="text-base" icon="today" />}
        text="Today"
        onClick={onTodayClicked}
      />

      <IconButton
        icon={<Icon className="text-base" icon="edit" />}
        text="Edit"
        onClick={() => {}}
      />

      <div className="grow" />

      <IconButton
        icon={<Icon className="text-base" icon="download" />}
        text="Download"
        onClick={() => {}}
      />
    </div>
  );
}
