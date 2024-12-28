import DrawioCommon from "@/components/Drawio"
import henceforthApi from "@/utils/henceforthApi";
import { stat } from "fs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DrawioCompany = () => {
    const router = useRouter()
    const [state, setState] = useState({} as any)
    const initData = async () => {
        try {
            let apiRes = await henceforthApi.Process.getById(String(router.query.process_id));
            console.log(apiRes)
            setState(apiRes)
        } catch (error) {
        } finally {
        }
    };
    console.log(state)
    useEffect(() => {
        initData()
    }, [router.query.process_id])
    return (
        <>
            <DrawioCommon state={state} />
        </>
    )
}
export default DrawioCompany