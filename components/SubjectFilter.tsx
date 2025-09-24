"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { subjects } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [onChangeSubject, setOnChangeSubject] = useState("");

  useEffect(() => {
    if(onChangeSubject == 'all'){
       const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
        router.push(newUrl, { scroll: false });
    }
    else if (onChangeSubject) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: onChangeSubject,
      });
      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });

        router.push(newUrl, { scroll: false });
      }
    }
  }, [onChangeSubject, router, searchParams, pathname]);

  return (
    <Select onValueChange={(subject) => setOnChangeSubject(subject)}>
      <SelectTrigger className='input'>
        <SelectValue placeholder='Find your Subject' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subject</SelectLabel>
          <SelectItem value='all'>All Subject</SelectItem>
          {subjects.map((subject) => (
            <SelectItem value={subject} key={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
