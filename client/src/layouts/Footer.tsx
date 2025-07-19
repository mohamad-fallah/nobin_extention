import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "white",
            opacity: 0.8,
          }}
        >
          © ۱۴۰۳ نوبین - تمامی حقوق محفوظ است
        </Typography>
      </Container>
    </Box>
  );
}
