import {
  ActionIcon,
  CopyButton,
  Group,
  NumberInput,
  Table,
  TextInput,
  Tooltip,
  rem,
  TableThead,
  TableTr, TableTh, TableTbody, TableTd
} from "@mantine/core"
import { create } from "zustand"
import { useEffect } from "react";
import { IconCheck, IconCopy, IconPlus, IconTrash } from "@tabler/icons-react";

const defaultSource = { id: 1, name: '', rate: '', hours: '', nextPayment: '-' };
const useHoursStore = create((set) =>({
  sources: [
    defaultSource,
  ],
  addSource: () => set((state) => {
    const lastId = state.sources.slice(-1)[0].id;

    return {
      sources: [...state.sources, { ...defaultSource, id: lastId + 1 }]
    };
  }),
  removeSource: (id) => set((state) => ({
    sources: state.sources.filter((source) => source.id !== id)
  })),
  updateSource: (id, what, newValue) => set((state) => ({
    sources: state.sources.map((source) => {
      if (source.id === id) {
        let payment = 0;

        if (source.rate && source.hours) {
          const hours = source.hours.includes(':') ? source.hours.split(':') : [source.hours, 0];
          payment = ((hours[0] * source.rate) + (hours[1] * (source.rate / 60))).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        }

        return {
          ...source,
          [what]: newValue.toString(),
          payment: `${payment} PLN`
        }
      }
      return source;
    })
  })),
}));

const RegularExpenses = () => {
  const { sources, addSource, updateSource } = useHoursStore();

  useEffect(() => {
    console.log(sources);
  }, [sources]);

  return (
    <div className="p-4">
      <Table withRowBorders={false}>
        <TableThead>
          <TableTr>
            <TableTh style={{ width: '30%' }}>Nazwa wydatku</TableTh>
            <TableTh style={{ width: '20%' }}>Kwota</TableTh>
            <TableTh style={{ width: '20%' }}>Dzień miesiąca</TableTh>
            <TableTh style={{ textAlign: 'right' }}>Kolejna płatność</TableTh>
            <TableTh style={{ width: '10%' }}></TableTh>
          </TableTr>
        </TableThead>

        <TableTbody>
          {sources && sources.map(source => (
            <TableTr key={source.id}>

              {/* Source name */}
              <TableTd>
                <TextInput
                  placeholder="Nazwa wydatku"
                  onChange={(event) => updateSource(source.id, 'name', event.target.value)}
                  variant="filled"
                  />
              </TableTd>

              {/* Source hourly rate */}
              <TableTd>
                <NumberInput
                  placeholder="W formacie liczbowym"
                  onChange={(value) => updateSource(source.id, 'rate', value)}
                  allowNegative={false}
                  variant="filled"
                  />
              </TableTd>

              {/* Source worked hours in HH:mm format */}
              <TableTd>
                <NumberInput
                  placeholder="1 - 31"
                  onChange={(value) => updateSource(source.id, 'hours', value)}
                  min={1}
                  max={31}
                  variant="filled"
                  />
              </TableTd>

              {/* Calculated values */}
              <TableTd style={{ textAlign: 'right' }}>
                <Group align="center" justify="flex-end">
                  {source.nextPayment}
                </Group>
              </TableTd>

              {/* Actions */}
              <TableTd>
                <Group gap="xs" justify="flex-end">
                  <ActionIcon variant="light" size="sm" color="blue" onClick={() => addSource()}>
                    <IconPlus />
                  </ActionIcon>
                  <ActionIcon variant="light" size="sm" color="red" onClick={() => removeSource(source.id)}>
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </TableTd>

            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </div>
  )
}

export default RegularExpenses
