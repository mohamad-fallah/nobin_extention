import MainLayout from "./layouts";
import CalendarWidget from "./widgets/calendar/CalendarWidget";
import CurrencyWidget from "./widgets/currency/CurrencyWidget";
import ProfileWidget from "./widgets/profile/ProfileWidget";
import SearchWidget from "./widgets/search/SearchWidget";
import TodoWidget from "./widgets/todo/TodoWidget";
import WeatherWidget from "./widgets/weather/WeatherWidget";
import { Box } from "@mui/material";

function App() {
  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        {/* Top Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 2fr 1fr" },
            gap: 2,
            mb: 2,
          }}
        >
          <WeatherWidget /> {/* DateTime Widget */}
          <SearchWidget /> {/* Search Bar */}
          <ProfileWidget /> {/* Notification Widget */}
        </Box>

        {/* Bottom Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 2fr 1fr" },
            gap: 2,
          }}
        >
          <CurrencyWidget /> {/* Tasks Widget */}
          <TodoWidget /> {/* Bookmark Cards */}
          <CalendarWidget /> {/* Calendar Widget */}
        </Box>
      </Box>
    </MainLayout>
  );
}

export default App;
