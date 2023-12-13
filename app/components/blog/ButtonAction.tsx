import Link from "next/link";
import Button from "../buttons/Button";

const ButtonAction = () => {
  return (
    <div>
      <Link className="btn mr-2" href="/blog/edit/1">
        <i className="ri-pencil-fill "></i>
        Edit
      </Link>
      <Button outline label="Delete" iconName="delete-bin-fill" type="button" />
    </div>
  );
};

export default ButtonAction;
