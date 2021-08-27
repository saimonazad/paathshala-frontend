import React, { useState, useEffect } from "react";
import Header from "./header";
import Posts from "./posts";
import Students from "./students";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";
import { useAuth } from "../../../authentication";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../services/fetcher";
import ClassPageNotEnrolled from "./classPageNotEnrolled";
import Assignments from "./assignment";
const ClassComponents = (props) => {
  const { authUser } = useAuth();
  //get course id
  const router = useRouter();
  const urlParam = router.query;
  let id = urlParam.slug[0];
  //tab state
  const [activeTab, setActiveTab] = useState("posts");
  //handle tab change
  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }

  //payment check
  const { data: payment, error: paymentError } = useSWR(
    `payment/check?course_id=12&username=saimonazad`,
    fetcher
  );
  if (paymentError) {
    return <ClassPageNotEnrolled />;
  }
  //get course student
  const { data: students, mutate: mutateStudent } = useSWR(
    `/course/controller?course_id=${id}`,
    fetcher
  );
  const courseInfoUrl = `/course/info?course_id=${id}`;
  const { data: courseInfo, error } = useSWR(courseInfoUrl, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    refreshInterval: 0,
  });

  return (
    <>
      <Header
        tabvalue={activeTab}
        changetab={handleTabChange}
        user={props.userDetails}
        courseInfo={courseInfo}
        error={error}
      />
      {activeTab == "posts" && <Posts user={props.userDetails} />}
      {activeTab == "students" && (
        <Students
          data={students}
          courseInfo={courseInfo}
          mutateStudent={mutateStudent}
        />
      )}
      {activeTab == "assignments" && <Assignments />}
    </>
  );
};

export default ClassComponents;
