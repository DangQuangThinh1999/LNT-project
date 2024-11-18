import { STEP_ENUM } from "@/utils/enum";
import { Steps } from "antd";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Confirmation } from "./Confirmation";
import { FillInformation, TConfirmationInfo } from "./FillInformation";
import { Transaction } from "./Transaction";
export type IStatus = "process" | "wait" | "finish";

const LIST_STEP = [
  {
    key: STEP_ENUM.FILL_INFO,
    title: <strong>Fill Information</strong>,
  },
  {
    key: STEP_ENUM.CONFIRMATION,
    title: <strong>Confirmation</strong>,
  },
  {
    key: STEP_ENUM.TRANSACTION,
    title: <strong>Transaction</strong>,
  },
];
const IconCircle = () => <div className="icon-circle"></div>;
const IconChecked = () => (
  <div className="icon-checked">
    <div className="icon-container"></div>
  </div>
);

const iconStatusMap = {
  process: <IconChecked />,
  wait: <IconCircle />,
  finish: <FaCheckCircle size={20} className="icon-finish" />,
  // error: <IoCloseCircleSharp className="icon-error" />,
};
export interface IDataStep {
  confirmationInfo?: TConfirmationInfo;
  transactionInfo?: ITransactionInfo;
}
interface ITransactionInfo {
  transactionId: string;
  amount: string;
  tokenSymbol: string;
}
const iconStatus = (status: IStatus) => iconStatusMap[status] || <IconCircle />;
export const Withdrawal = () => {
  const [step, setStep] = useState(STEP_ENUM.FILL_INFO);
  const [dataStep, setDataStep] = useState<IDataStep>({
    confirmationInfo: undefined,
    transactionInfo: undefined,
  });
  const handleStepStatus = (stepNum: STEP_ENUM) => {
    setStep(stepNum);
  };
  const handleDataStep = (dataInfo: IDataStep) => {
    setDataStep(dataInfo);
  };

  return (
    <div className="withdrawal-wrapper">
      <Steps
        className="step-container"
        items={LIST_STEP.map((stepInfo, stepIndex) => {
          const statusStep =
            step > stepIndex
              ? "finish"
              : step === stepIndex
              ? "process"
              : "wait";
          return {
            ...stepInfo,
            status: statusStep,
            title: stepInfo.title,
            icon: iconStatus(statusStep),
          };
        })}
      />
      {step === STEP_ENUM.FILL_INFO && (
        <FillInformation
          handleDataStep={handleDataStep}
          handleStepStatus={handleStepStatus}
        />
      )}
      {step === STEP_ENUM.CONFIRMATION && (
        <Confirmation
          handleDataStep={handleDataStep}
          confirmationInfo={dataStep?.confirmationInfo}
          handleStepStatus={handleStepStatus}
        />
      )}
      {step === STEP_ENUM.TRANSACTION && (
        <Transaction dataStep={dataStep} handleStepStatus={handleStepStatus} />
      )}
    </div>
  );
};
