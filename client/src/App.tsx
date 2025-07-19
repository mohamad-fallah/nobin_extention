import MainLayout from "./layouts";
import CalendarWidget from "./widgets/calendar/CalendarWidget";
import CurrencyWidget from "./widgets/currency/CurrencyWidget";
import ProfileWidget from "./widgets/profile/ProfileWidget";
import SearchWidget from "./widgets/search/SearchWidget";
import TodoWidget from "./widgets/todo/TodoWidget";
import WeatherWidget from "./widgets/weather/WeatherWidget";
import { Box, Grid } from "@mui/material";

function App() {
  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <WeatherWidget />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SearchWidget />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProfileWidget />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CurrencyWidget />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TodoWidget />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CalendarWidget />
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}

export default App;
