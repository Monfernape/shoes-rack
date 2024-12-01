import FormWrapper from "@/common/FormWrapper";
import AddDevUserForm from "./components/AddDevUserForm";
import UpdateDevUserFrom from "./components/UpdateDevUserForm";

const Page = () => {
  return (
    
      <FormWrapper>
        <AddDevUserForm />
        <UpdateDevUserFrom />
      </FormWrapper>
    
  );
};

export default Page;
