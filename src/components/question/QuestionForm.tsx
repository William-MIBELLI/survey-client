import { useEffect, useState, type FC } from "react";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Check from "../ui/Check";
import Button from "../ui/Button";
import QuestionOptions from "./QuestionOptions";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, type TQuestionSchema } from "../../lib/zod";
import { QuestionType } from "../../gql/generated";
import type { TQuestion } from "./Question";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface IProps {
  question?: TQuestion;
  cancel: () => void;
  submit: (data: TQuestionSchema) => Promise<void>;
  isOpen: boolean;
  title: string;
}

const QuestionForm: FC<IProps> = ({
  question,
  cancel,
  submit,
  isOpen,
  title,
}) => {
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);
  const [displayDirty, setDisplayDirty] = useState<boolean>(false);
  const [deletedOptionIds, setDeletedOptionIds] = useState<string[]>([]);

  const handleDeletedOptionIds = (id: string) => {
    setDeletedOptionIds((previous) => [...previous, id]);
  };

  useEffect(() => {
    // console.log('DELETED OPTIONS : ', deletedOptionIds)
  }, [deletedOptionIds]);

  const onSubmitHandler = (data: TQuestionSchema) => {
    if (data.options) {
      const reIndexedOptions = data.options.map((option, index) => ({
        ...option,
        position: index,
      }));
      submit({ ...data, options: reIndexedOptions, deletedOptionIds });
    } else {
      submit({ ...data, deletedOptionIds });
    }
    reset();
  };

  const methods = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      isMandatory: question?.node.isMandatory || false,
      label: question?.node.label || "",
      type: question?.node.type || QuestionType.Open,
      options: question?.node
        ? question.node.options.map((o) => ({ ...o, optionId: o.id }))
        : undefined,
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    control,
    getValues,
    reset,
  } = methods;

  //AFFICHAGE DES OPTIONS
  const type = useWatch({ control, name: "type" });

  useEffect(() => {
    setOptionDisplay(type !== "OPEN");
  }, [type]);

  const onCancelHandler = () => {
    setDisplayDirty(isDirty);
    if (isDirty) {
      return;
    }
    reset();
    cancel();
  };

  return (
    <FormProvider {...methods}>
      <Dialog onClose={onCancelHandler} open={isOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel>
            <h2 className=" bg-black border-2 border-black shadowButton p-3 text-white text-5xl">
              {title}
            </h2>
            <form
              className=" bg-white border-4 shadowButton border-black p-4 flex gap-3"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className=" grid grid-cols-2 gap-4 w-1/2 content-center justify-items-stretch">
                <Controller
                  control={control}
                  name="label"
                  render={({ field }) => (
                    <TextArea
                      label="Label"
                      className="col-span-2"
                      {...field}
                      error={errors.label}
                    />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select label="Type" {...field} error={errors.type}>
                      <option>Select type...</option>
                      <option value={"OPEN"}>Open</option>
                      <option value={"SIMPLE"}>Simple</option>
                      <option value={"MULTIPLE"}>Multiple</option>
                    </Select>
                  )}
                />
                <Controller
                  name="isMandatory"
                  control={control}
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <Check
                      label="Mandatory"
                      className="m-auto"
                      checked={value}
                      onChange={onChange}
                      {...fieldProps}
                    />
                  )}
                />
                <Button
                  text="Save"
                  type="submit"
                  className="col-span-1 bg-green-400"
                />
                <Button
                  text="Cancel"
                  type="button"
                  className="col-span-1 bg-red-400"
                  onClick={cancel}
                />
                <p className="col-span-2 errorInputMessage">
                  {errors.options?.message}
                </p>
                {displayDirty && (
                  <p className="errorInputMessage col-span-2">
                    There are some unsaved modifications. Please save or cancel.
                  </p>
                )}
              </div>
              <div className="border-2 border-black ml-3"></div>
              {optionDisplay ? (
                <QuestionOptions
                  handleDeletedOptionIds={handleDeletedOptionIds}
                />
              ) : (
                <div className="flex flex-col justify-center items-center mx-auto gap-3 text-sm font-semibold text-center ">
                  <p className="bg-cyan-300 -rotate-3">
                    With question's type OPEN, there are no options to define.
                  </p>
                  <p className="bg-cyan-300 -rotate-3">
                    If you want add some, please choose question's type SIMPLE
                    or MULTIPLE.
                  </p>
                </div>
              )}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </FormProvider>
  );
};

export default QuestionForm;
