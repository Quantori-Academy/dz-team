import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { $storageList, StorageGate } from "stores/storage";

export const ChooseStorage = () => {
    useGate(StorageGate);
    const storage = useUnit($storageList);

    // const [selectedRoom, setSelectedRoom] = useState("");

    // const handleStorageChange = (event: React.ChangeEvent<{ value: string }>) => {
    //     selectedId = event.target.value as string;
    //     console.log(selectedId);
    //     setSelectedRoom(selectedId);
    //     setStorageRoomId(selectedId);
    // };

    // const handleClick = () => {
    //     moveReagentsToStorageFx();
    //     console.log("component move");
    // };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Select Storage Room
            </Typography>
            <Select
                // value={selectedRoom}
                // onChange={handleStorageChange}
                displayEmpty
                fullWidth
                variant="outlined"
            >
                <MenuItem value="" disabled>
                    Choose a storage room
                </MenuItem>
                {storage.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {`${item.name} - ${item.room}`}
                    </MenuItem>
                ))}
            </Select>
            {/* <Button onClick={handleClick}>Move</Button> */}
        </Box>
    );
};
