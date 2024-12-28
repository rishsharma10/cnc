import React, { Fragment, useState } from 'react';
import dayjs from "dayjs"
import { Button, Flex } from '@/lib/AntRegistry';
import { useRouter } from 'next/router';

const TimeSlot = () => {
  const router = useRouter()
  // Define the start and end date using the provided timestamps
  const leaveStartDate = new Date(Number(router.query.start_date));
  const leaveEndDate = new Date(Number(router.query.end_date));

  // Define the interval for the slots (in milliseconds)
  const interval = 30 * 60 * 1000; // 30 minutes

  // Function to generate time slots between two dates
  const generateTimeSlots = (start:any, end:any, interval:any) => {
    let slots = [];
    let currentTime = start;

    // Add slots from start to end
    while (currentTime < end) {
      slots.push(new Date(currentTime));
      currentTime += interval;
    }

    // Ensure the end date is included in the slots
    slots.push(new Date(end));

    return slots;
  };

  // Generate time slots
  const slots = generateTimeSlots(leaveStartDate, leaveEndDate, interval);

  // Calculate middle date
  const middleTime = new Date((leaveStartDate.getTime() + leaveEndDate.getTime()) / 2);

  // Add the middle date to the slots array (if not already included)
  const updatedSlots = [...slots];
  if (!updatedSlots.some(slot => slot.getTime() === middleTime.getTime())) {
    updatedSlots.push(middleTime);
    updatedSlots.sort((a, b) => a.getTime() - b.getTime()); // Sort after adding the middle date
  }

  return (
    <div>
      <h5>Leave Applied For</h5>
      {/* <ul>
        {updatedSlots.map((slot, index) => (
          <li key={index}>{dayjs(slot).format(`DD/MM/YY`)}</li>
        ))}
      </ul> */}
      <Fragment>
        {/* {Array.isArray(updatedSlots) && updatedSlots.map((slot:any, index:number) => ( */}
          <Flex align='center' justify='between' gap={10}>
            <Button className='m-1 mt-0' type={"dashed"}>{dayjs(updatedSlots[0]).format(`DD/MM/YYYY`)} </Button> To
            <Button className='m-1 mt-0'  type={"dashed"}>{dayjs(updatedSlots[updatedSlots?.length -1]).format(`DD/MM/YYYY`)} </Button>

          </Flex>
      {/* ))} */}
      </Fragment>
    </div>
    
  );
};

export default TimeSlot;
