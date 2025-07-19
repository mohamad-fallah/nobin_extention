import { Card, TextField, InputAdornment, IconButton } from "@mui/material";
import { FiSearch, FiMic } from "react-icons/fi";

export default function SearchWidget() {
  return (
    <Card
      sx={{
        height: 60,
        p: 1.5,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        fullWidth
        placeholder="جستجو ..."
        variant="outlined"
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.03)",
            "& fieldset": {
              border: "1px solid rgba(0,0,0,0.08)",
            },
            "&:hover fieldset": {
              border: "1px solid rgba(0,0,0,0.15)",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid primary.main",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FiSearch size={18} color="#888" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" sx={{ color: "#888" }}>
                <FiMic size={14} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Card>
  );
}
