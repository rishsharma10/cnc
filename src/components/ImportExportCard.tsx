import { Avatar, Button, Card, Flex, Image, Space, TypographyText, TypographyTitle } from "@/lib/AntRegistry"
import React, { useContext } from "react"
import placeholder from '@/assets/images/profile.png';
import HenceforthIcons from "./HenceforthIcons";
import dayjs from 'dayjs';
import henceforthApi, { BUCKET_ROOT } from "@/utils/henceforthApi";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import PDF_icn from "@/assets/images/PDF_icn.svg"
const ImportExportCard = (props: any) => {
    const { Toast } = useContext(GlobalContext);
    const router = useRouter();

    const patchImportExport = async () => {
        const payload = {
            media_url: props?.media_url,
            type: props?.media_type
        };
        try {
            const apiRes = await henceforthApi.Process.patchimportexport(payload);
            Toast.success(apiRes?.message);
        } catch (error) {
            Toast.error(error);
        }
    }

    const handleShare = () => {
        if (props?.media_url?.endsWith("png")) {
            window.open(`${henceforthApi.API_FILE_ROOT_ORIGINAL}${props?.media_url}`, '_blank');
        } else if (props?.media_url?.endsWith("mp4")) {
            window.open(`${BUCKET_ROOT}/video/${props?.media_url}`, '_blank');
        } else if (props?.media_url?.endsWith("pdf")) {
            window.open(`${henceforthApi.API_FILE_ROOT_DOCUMENTS}${props?.media_url}`, '_blank');
        } else if (props?.media_url?.endsWith("mp3")) {
            window.open(`${BUCKET_ROOT}/audio/${props?.media_url}`, '_blank');
        }
    }
    

    const handleDownload = () => {
        let fileUrl:any, fileName:any ;
        
        if(props?.media_url?.endsWith("pdf")){
            fileUrl = henceforthApi.FILES.document(props?.media_url, "pdf"); 
            fileName = `${props?.media_url}`;
        }
        else if(props?.media_url?.endsWith("png")){
            fileUrl = henceforthApi.FILES.imageOriginal(props?.media_url, "image");
                fileName = `${props?.media_url}`; 
        }
        else if(props?.media_url?.endsWith("mp3")){
            fileUrl = henceforthApi.FILES.audio(props?.media_url);
            fileName = `${props?.media_url}`;
        }else{
            fileUrl = henceforthApi.FILES.video(props?.media_url);
            fileName = `${props?.media_url}`;
        }
       

        fetch(fileUrl, { mode: 'cors' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.blob();
            })
            .then(blob => {
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                patchImportExport();
            })
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }

    return (
        <React.Fragment>
            <Card className="bg-transparent shadow-none" bordered={false}>
                <Flex align="center" gap={16}>
                    {props?.media_url?.endsWith("png") ? (
                        <Image src={henceforthApi.FILES.imageOriginal(props?.media_url, placeholder.src)} height={100} width={100} style={{ minWidth: 100, borderRadius: 8 }} />
                    ) : props?.media_url?.endsWith("mp4") ? (
                        <div className="import_video position-relative" onClick={handleShare}>
                            {/* <video poster={henceforthApi.FILES.video(props?.media_url)} className="img-fluid rounded-3">
                                <source src={props?.media_url} />
                            </video> */}
                            <span className="position-absolute"><HenceforthIcons.VideoRocord /></span>
                        </div>
                    ) : props?.media_url?.endsWith("pdf") ? ( // Handle PDF files
                        <div className="import_video position-relative" onClick={handleShare}>
                            <Image preview={false} src={PDF_icn.src} height={100} width={100} style={{ minWidth: 100, borderRadius: 8 }} />
                            {/* <span className="position-absolute"><HenceforthIcons.PDF_icn /></span> Replace with your PDF icon */}
                        </div>
                    ) : props?.media_type === "DOC" ? ( // Handle PDF files
                        <div className="import_video position-relative" onClick={handleShare}>
                            <Image src={placeholder.src} height={100} width={100} style={{ minWidth: 100, borderRadius: 8 }} />
                            <span className="position-absolute"><HenceforthIcons.PDF_icn /></span> {/* Replace with your PDF icon */}
                        </div>
                    ) : (
                        <div className="import_video position-relative" onClick={handleShare}>
                            {/* <audio src={henceforthApi.FILES.audio(props?.media_url)} className="img-fluid rounded-3">
                                <source src={props?.media_url} />
                            </audio> */}
                            <span className="position-absolute"><HenceforthIcons.AudioRocord /></span>
                        </div>
                    )}
                    <Space direction="vertical" className="gap-1">
                        <TypographyTitle level={5} className="m-0">{props?.media_url}</TypographyTitle>
                        <TypographyText type="secondary" className="d-block mb-1">{dayjs(props?.created_at).format('DD-MM-YY [at] hh:mm A')}</TypographyText>
                        <TypographyText type="secondary" className="d-block mb-1">{props?.user_id?.first_name ? `${props?.user_id?.first_name} ${props?.user_id?.last_name ?? ""}` : props?.user_id?.email ? props?.user_id?.email : "N/A"}</TypographyText>
                        <Button type="text" className="text-primary p-0 h-100" icon={<HenceforthIcons.Download />} onClick={handleDownload}>
                            Download
                        </Button>
                    </Space>
                </Flex>

            </Card>
        </React.Fragment>
    );
}

export default ImportExportCard;
