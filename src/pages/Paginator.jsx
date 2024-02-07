import { IconButton, Stack, Input, Typography } from "@mui/joy";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useImmer } from "use-immer";

function Paginator({ pagination, setPagination, showLimiter, maxIndex }) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <IconButton
        disabled={pagination.page <= 1}
        onClick={() =>
          setPagination((p) => {
            p.page--;
          })
        }
      >
        <MdArrowBackIos />
      </IconButton>
      <Typography>
        Page {pagination.page}/{maxIndex}
      </Typography>
      <IconButton
        disabled={pagination.page >= maxIndex}
        onClick={() =>
          setPagination((p) => {
            p.page++;
          })
        }
      >
        <MdArrowForwardIos />
      </IconButton>
      <div style={{ flex: 1 }}></div>
      {showLimiter && (
        <Input
          placeholder="Rows per page"
          type="number"
          defaultValue={pagination.limit}
          onChange={(e) => {
            setPagination((p) => {
              p.limit = e.target.valueAsNumber;
            });
          }}
        />
      )}
    </Stack>
  );
}

const usePaginator = ({
  startingLimit = 10,
  state = [],
  showLimiter = false,
}) => {
  const [pagination, setP] = useImmer({
    limit: startingLimit,
    page: 1,
  });
  const endIndex = Math.max(pagination.limit * pagination.page, 1);
  const startIndex = Math.max(endIndex - pagination.limit, 0);
  let maxIndex = Math.max(Math.ceil(state.length / pagination.limit), 1);
  maxIndex = isNaN(maxIndex) ? 0 : maxIndex;
  const data = state.slice(startIndex, endIndex);
  return [
    <Paginator
      pagination={pagination}
      setPagination={setP}
      showLimiter={showLimiter}
      maxIndex={maxIndex}
    />,
    data,
  ];
};

export default usePaginator;
