import FormWrapper from "@/common/FormWrapper";
import AddDevUserForm from "./components/AddDevUserForm";
import UpdateDevUserFrom from "./components/UpdateDevUserForm";
import DevLayout from "./devLayout";

const Page = () => {
  return (
    <DevLayout>
      <FormWrapper>
        <AddDevUserForm />
        <UpdateDevUserFrom />
      </FormWrapper>
    </DevLayout>
  );
};

export default Page;
