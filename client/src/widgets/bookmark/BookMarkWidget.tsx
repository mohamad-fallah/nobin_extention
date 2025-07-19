import { Button, Grid } from "@mui/material";
import { FiBookmark } from "react-icons/fi";

export default function BookMarkWidget() {
  // Create 10 empty bookmark cards
  const bookmarks = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
  }));

  return (
    <Grid container spacing={2}>
      {bookmarks.map((bookmark) => (
        <Grid size={{ md: 3 }}>
          <Button
            key={bookmark.id}
            variant="outlined"
            sx={{
              borderRadius: 2,
              bgcolor: "white",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              minHeight: "60px",
            }}
          >
            <FiBookmark size={20} />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
