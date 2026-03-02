import { IoChevronBack } from "react-icons/io5";
import PageHeading from "../../components/ui/PageHeading";

const SubscriptionHistory = () => {
  return (
    <div>
      <PageHeading
        title={`Subscription History`}
        backIcon={IoChevronBack}
        className="capitalize gap-0"
      />
    </div>
  );
};

export default SubscriptionHistory;
