import { useMemo, useState, useEffect } from "react";
import "./PaginaNotificacao.css";
import apiClient from "./services/api";

export type Notice = {
  created: string;
  text: string;
};

const MOCK: Notice[] = [
  { created: "01/08/2025 17:03:35", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { created: "01/08/2025 16:55:10", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { created: "01/08/2025 16:30:49", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
  { created: "01/08/2025 16:30:01", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse." },
  { created: "01/08/2025 16:30:00", text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa." },
  { created: "01/08/2025 16:29:12", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { created: "01/08/2025 11:30:20", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

export default function PaginaNotificacao() {
  const [rows] = useState<Notice[]>(MOCK);
  const [sortAsc, setSortAsc] = useState(false);
  const [notifcationList, setNotificationList] = useState<Notice[]>([]);

  const sorted = useMemo(() => {
    const copy = [...rows];
    const toDate = (s: string) => {
      const [date, time] = s.split(" ");
      const [d, m, y] = date.split("/").map(Number);
      const [hh, mm, ss] = time.split(":").map(Number);
      return new Date(y, m - 1, d, hh, mm, ss);
    };
    copy.sort((a, b) =>
      sortAsc
        ? toDate(a.created).getTime() - toDate(b.created).getTime()
        : toDate(b.created).getTime() - toDate(a.created).getTime()
    );
    return copy;
  }, [rows, sortAsc]);

  const getNotification = async () => {
    const { data: notifications } = await apiClient.get('/notice/list', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiIDogImFjY291bnRzLm9jcHAtY3NzLmNvbSIsICJhdWQiIDogIndlYi1vY3BwLWNzcy5jb20iLCAic3ViIiA6ICIyNDI3NmE2MWUwMzA5NmVkN2EyZDQ2ZGZkZDc3MTEyZmExNGMxMzdmIiwgImlhdCIgOiAxNzU5MTgxMjU0LCAiZXhwIiA6IDE3NTkxODQ4NTR9.WoW01202Ul2pb8_t8daNBb5vF5zFU1XcCTdAGRlscgQ'
    }
  });
    if(notifications.length > 0){
      let notList: ((prevState: Notice[]) => Notice[]) | { created: any; text: any; }[] = []
      notifications.forEach((notification: {
        data: any; created: any; text: any; 
}) => {
        notList.push({
          created: notification.created,
          text: notification?.data?.message?.body
        })
        
      });
      console.log(notList)
      setNotificationList(notList)
    }
  }

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="notificacao-container">
      <h1 className="notificacao-title">Notice</h1>
      <div className="notificacao-card">
        <table className="notificacao-table">
          <thead>
            <tr>
              <th className="notificacao-th created-col">
                <button
                  className="sort-btn"
                  onClick={() => setSortAsc((s) => !s)}
                  title="Ordenar"
                >
                  <span>Created</span>
                  <span className="sort-icon">{sortAsc ? "▲" : "▼"}</span>
                </button>
              </th>
              <th className="notificacao-th">Notice text</th>
            </tr>
          </thead>
          <tbody>
            {notifcationList.map((n, i) => (
              <tr
                key={`${n.created}-${i}`}
                className={i % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td className="notificacao-td mono">{n.created}</td>
                <td className="notificacao-td">{n.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}