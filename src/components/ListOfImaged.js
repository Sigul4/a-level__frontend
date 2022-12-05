import { CardMedia } from "@mui/material";

export default function ListOfImages({
  images,
  ChangeImagesIds,
  ChangeImages,
}) {
  console.log("images", images, );

  return (
    <div style={{ display: "flex" }}>
      {Array.isArray(images)
        ? images.map((image, index) => {
            // console.log('image?.url',image?.url, image?.url.length)
            const url = image?.url;
            return (
              <CardMedia
                onClick={() => {
                  ChangeImagesIds((images) =>
                    images.filter((normalImg) => normalImg.url !== image.url)
                  );
                  ChangeImages((images) =>
                    images.filter((normalImg) => normalImg.url !== image.url)
                  );
                }}
                component="img"
                height="50px"
                width="50px"
                image={url}
                sx={{ width: "10%" }}
              />
            );
          })
        : ""}
    </div>
  );
}
