import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { msToTime } from '@/utils/helpers';
import useTimeList from '@/hooks/useTimeList';
import { Box } from '@/types';

interface Props {
  box: Box | undefined;
}

const BoxCardSummaryTable = ({ box }: Props) => {
  const timeList = useTimeList(box);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Last</TableCell>
            <TableCell>Best</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>{msToTime(timeList?.getLastTime(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getBestTime(), true)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>AO5</TableCell>
            <TableCell>{msToTime(timeList?.getLastAverageOf5(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getBestAverageOf5(), true)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>AO12</TableCell>
            <TableCell>{msToTime(timeList?.getLastAverageOf12(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getBestAverageOf12(), true)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoxCardSummaryTable;