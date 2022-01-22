import { useState, ReactElement, MouseEvent } from 'react';
import { User } from 'firebase/auth';
import { Box } from '@/types';
import { Typography, Grid } from '@mui/material';
import BoxCard from '@/components/boxes/card/BoxCard';
import BoxGridToolbar from '@/components/boxes/grid/BoxGridToolbar';
import CreateBoxDialog from '@/components/boxes/dialogs/CreateBoxDialog';
import DeleteBoxDialog from '@/components/boxes/dialogs/DeleteBoxDialog';
import EditBoxDialog from '@/components/boxes/dialogs/EditBoxDialog';
import { useData } from '@/hooks/useData';
import type { Profile } from '@/types';

interface Props {
  user: User | null | undefined;
  profile: Profile | null;
  boxes: Box[];
  showControls?: boolean;
}

const BoxGrid = ({ user, boxes, profile, showControls = false }: Props): ReactElement => {
  const [searchString, setSearchString] = useState<string | null>();
  const [view, setView] = useState<string | null>('grid');

  const handleChangeView = (_: MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const { createBox, deleteBox, editBox } = useData();

  const [creatingBox, setCreatingBox] = useState(false);
  const [deletingBox, setDeletingBox] = useState<Box | null>(null);
  const [editingBox, setEditingBox] = useState<Box | null>(null);

  return (
    <>
      <BoxGridToolbar
        showControls={showControls}
        view={view}
        handleChangeView={handleChangeView}
        handleSearchInput={(searchString) => setSearchString(searchString.target.value)}
        handleOpenCreateDialog={() => setCreatingBox(true)}
      />
      {user && profile && (
        <>
          {profile !== null && boxes.length === 0 && 'No boxes'}
          <Grid container spacing={2}>
            {view === 'grid' ? (
              boxes.map((box) => (
                <Grid xs={12} lg={6} xl={4} item key={box.id}>
                  <BoxCard
                    user={user}
                    box={box}
                    showControls={showControls}
                    openDeleteBoxDialog={() => setDeletingBox(box)}
                    openEditBoxDialog={() => setEditingBox(box)}
                    share={() =>
                      console.log(`localhost:3000/users/${user?.uid}/boxes/${box.id}`)
                    }
                  />
                </Grid>
              ))
            ) : (
              <Typography>List view here / seachString: {searchString}</Typography>
            )}
          </Grid>
        </>
      )}
      {user === null && 'User not found'}
      {user && profile === null && 'Profile is private'}
      {showControls && (
        <CreateBoxDialog open={creatingBox} handleClose={() => setCreatingBox(false)} />
      )}
      {/* {showControls && (
        <CreateBoxDialog
          open={creatingBox}
          handleClose={() => setCreatingBox(false)}
          createBox={async (name: string, icon: string, color: string): Promise<void> => {
            await createBox({
              name: name,
              icon: icon,
              color: color,
            });
          }}
        />
      )} */}
      {showControls && deletingBox && (
        <DeleteBoxDialog
          box={deletingBox}
          handleClose={() => setDeletingBox(null)}
          deleteBox={async (): Promise<void> => {
            await deleteBox(deletingBox.id);
          }}
        />
      )}
      {showControls && editingBox && (
        <EditBoxDialog
          box={editingBox}
          handleClose={() => setEditingBox(null)}
          editBox={async (name: string, icon: string, color: string): Promise<void> => {
            await editBox(editingBox.id, {
              name: name,
              icon: icon,
              color: color,
            });
          }}
        />
      )}
    </>
  );
};

export default BoxGrid;
