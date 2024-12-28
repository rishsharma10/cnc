import {
    Avatar,
    Card,
    Flex,
    TypographyText,
    TypographyTitle,
  } from "@/lib/AntRegistry";
  import profile from "@/assets/images/profile.png";
  import henceforthApi from "@/utils/henceforthApi";
  const OrganizationCard = (props: any) => {
    return (
      <Card>
        <Flex>
          <div className="user_image">
            <Avatar
              src={
                props?.profile_pic
                  ? henceforthApi.FILES.imageSmall(props?.profile_pic)
                  : profile.src
              }
              size={62}
            />
          </div>
          <div>
          <div className="organization_title">{props?.index !== -1 ? `${props?.title} ${
            props?.index + 1
          }`:"Super Admin"}</div>
          <TypographyText className="fw-semibold organization_user d-block text-center">
              {props?.name
                ? props?.name
                : props?.first_name
                ? `${props?.first_name} ${props?.last_name ?? ""}`
                : props?.email ? props?.email?.length > 12 ? `${props?.email?.slice(0,12)}...` : props?.email  :"N/A"}
            </TypographyText>
            
          </div>
        </Flex>
      </Card>
    );
  };
  export default OrganizationCard;
  