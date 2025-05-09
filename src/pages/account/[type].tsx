import CommonLayout from "@/components/common/CommonLayout";
import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import ProfileCompo from "@/components/user/ProfileCompo";
import OrderList from "@/components/user/OrderList";
import CommonBanner from "@/components/CommonBanner";
import bannerImg from "@/assets/images/freshly-baked-sweet-buns-puff-pastry.jpg";

const Account = () => {
  const router = useRouter();
  return (
    <>
      <CommonBanner
        title={router.query.type == "profile" ? "Profile" : "My Orders"}
        image={bannerImg.src}
      />
      <div className="mt-2 p-3 p-sm-5">
        {router.query.type == "profile" ? <ProfileCompo /> : <OrderList />}
      </div>
    </>
  );
};
Account.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
export default Account;
