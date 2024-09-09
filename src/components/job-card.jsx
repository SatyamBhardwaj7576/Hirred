import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useUser } from "@clerk/clerk-react";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { saveJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { deleteJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyJob = false,
  // initial state of the job
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);


  const {
    fn: fnSavedJobs,
    data: savedjobs,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, { alreadySaved: saved });

  const { user } = useUser();

  const handleSaveJob = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved()
  };

  //delete saved jobs
  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });
  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };


  useEffect(() => {
    if (savedjobs !== undefined) {
      setSaved(savedjobs?.length > 0);
    }
  }, [savedjobs]);
  return (
    <Card className='flex flex-col'>
        {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            ></Trash2Icon>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img src={job.company.logo_url} className="h-6"></img>
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15}></MapPinIcon>
            {job.location}
          </div>
        </div>

        <hr />

        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red"></Heart>
            ) : (
              <Heart size={20}></Heart>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
