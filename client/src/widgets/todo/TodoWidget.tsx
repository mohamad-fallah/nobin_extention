import { Card, Box, IconButton } from "@mui/material";
import { FiBookmark } from "react-icons/fi";

export default function TodoWidget() {
  // Create 10 empty bookmark cards
  const bookmarks = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    isEmpty: true,
  }));

  return (
    <Card
      sx={{
        height: 200,
        p: 2,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 1.5,
          width: "100%",
          height: "100%",
          maxWidth: "400px",
          maxHeight: "160px",
        }}
      >
        {bookmarks.map((bookmark) => (
          <Card
            key={bookmark.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              minHeight: "60px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <IconButton
              size="medium"
              sx={{
                color: "text.disabled",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "transparent",
                },
              }}
            >
              <FiBookmark size={20} />
            </IconButton>
          </Card>
        ))}
      </Box>
    </Card>
  );
}
