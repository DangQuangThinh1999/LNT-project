import { Steps } from "antd";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Confirmation } from "./Confirmation";
import { FillInformation, TConfirmationInfo } from "./FillInformation";
import { Transaction } from "./Transaction";
export type IStatus = "process" | "wait" | "finish" | "error";
export type IStep = {
  isActive: boolean;
  status: IStatus;
};

const LIST_STEP: IStep[] = [
  {
    isActive: true,
    status: "process",
  },
  { isActive: false, status: "wait" },
  { isActive: false, status: "wait" },
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
  error: <IoCloseCircleSharp className="icon-error" />,
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
  const [statusStep, setStatusStep] = useState(LIST_STEP);
  const [dataStep, setDataStep] = useState<IDataStep>({
    confirmationInfo: undefined,
    transactionInfo: undefined,
  });
  const handleStepStatus = (
    stepIndex: number,
    newStatus: IStatus,
    isActive: boolean
  ) => {
    setStatusStep((prev) =>
      prev.map((step, index) =>
        index === stepIndex
          ? { ...step, status: newStatus, isActive: isActive }
          : step
      )
    );
  };
  const handleDataStep = (dataInfo: IDataStep) => {
    setDataStep(dataInfo);
  };

  return (
    <div className="withdrawal-wrapper">
      <Steps
        className="step-container"
        items={[
          {
            title: <strong>Fill Information</strong>,
            status: statusStep[0].status,
            icon: iconStatus(statusStep[0].status),
          },
          {
            title: <strong>Confirmation</strong>,
            status: statusStep[1].status,
            icon: iconStatus(statusStep[1].status),
          },
          {
            title: <strong>Transaction Status</strong>,
            status: statusStep[2].status,
            icon: iconStatus(statusStep[2].status),
          },
        ]}
      />
      {statusStep[0].isActive === true && (
        <FillInformation
          handleDataStep={handleDataStep}
          handleStepStatus={handleStepStatus}
        />
      )}
      {statusStep[1].isActive === true && (
        <Confirmation
          handleDataStep={handleDataStep}
          dataStep={dataStep}
          handleStepStatus={handleStepStatus}
        />
      )}
      {statusStep[2].isActive === true && (
        <Transaction dataStep={dataStep} handleStepStatus={handleStepStatus} />
      )}
    </div>
  );
};
