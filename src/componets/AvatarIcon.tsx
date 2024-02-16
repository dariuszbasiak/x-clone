import { minidenticon } from "minidenticons";
import { useMemo } from "react";
import { AVATAR_LIGHT, AVATAR_SATURATION } from "../shared/const";
import Avatar from "@mui/material/Avatar";

export const AvatarIcon = ({ username, sx, ...props }: any) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        minidenticon(username, AVATAR_SATURATION, AVATAR_LIGHT)
      ),
    [username, AVATAR_SATURATION, AVATAR_LIGHT]
  );
  return (
    <Avatar
      src={svgURI}
      alt={username}
      {...props}
      sx={{ bgcolor: "rgba(25, 118, 210, 0.5)", ...sx }}
    />
  );
};
