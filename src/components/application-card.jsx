import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36b7d7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          ></Download>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15}></BriefcaseBusiness>
            {application?.experience} years of experience
          </div>

          <div className="flex gap-2 items-center">
            <School size={15}></School>
            {application?.education}
          </div>

          <div className="flex gap-2 items-center">
            <Boxes size={15}></Boxes>
            Skills: {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status: {application?.status}
          </span>
        ) : (
          <Select onValueChange={handleStatusChange} defaultValue={application.status}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
