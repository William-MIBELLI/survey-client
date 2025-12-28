import Form from "../components/forms/Form";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import Check from "../components/ui/Check";
import Button from "../components/ui/Button";
import { useMutation } from "@apollo/client/react";
import type {
  CreateSurveyMutation,
  MutationCreateSurveyArgs,
} from "../gql/generated";
import { CREATE_SURVEY } from "../lib/mutations/survey.mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSurveySchema, type TCreateSurveySchema } from "../lib/zod";
import { useNavigate } from "react-router";

const CreateSurvey = () => {
  const [createSurvey, { loading, error }] = useMutation<
    CreateSurveyMutation,
    MutationCreateSurveyArgs
  >(CREATE_SURVEY);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSurveySchema),
  });
  const navigate = useNavigate();

  const onSubmitHandler = (data: TCreateSurveySchema) => {
    createSurvey({
      variables: {
        args: {
          ...data,
        },
      },
      onCompleted: (data) => {
        if (!data.createSurvey) return;
        navigate(`/dashboard/survey/${data.createSurvey.id}`);
      },
    });
  };

  return (
    <div
      className="h-full w-full  flex flex-col justify-center items-center relative bg-yellow-300"
      popover="auto"
      id="create-popover"
    >
      <div className="absolute w-2/3 h-1/2 left-0 top-0 rounded-r-full bg-purple-500 "></div>
      <h2 className="text-8xl  mb-4 z-10 bg-white">Survey creation</h2>
      <form
        className="flex flex-col bg-white w-1/2 p-6 border-4 shadowDiv border-black z-10"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex flex-col gap-2">
          <Input label="Name*" {...register("name")} error={errors.name} />
          <TextArea
            label="Description*"
            {...register("description")}
            error={errors.description}
            rows={5}
          />
          <Input
            type="date"
            label="Start date"
            {...register("startDate")}
            error={errors.startDate}
          />
          <Input
            type="date"
            label="End date"
            {...register("endDate")}
            error={errors.endDate}
          />
          <Check label="The survey is public" {...register("isPublic")} />
        </div>
        <Button
          loading={loading}
          type="submit"
          text="Create"
          className="bg-green-400"
        />
        {error && <p className="errorInputMessage">{error.message}</p>}
        <p className="text-xs font-semibold mt-3 text-end">
          Fields with * is mandatory
        </p>
      </form>
    </div>
  );
};

export default CreateSurvey;
