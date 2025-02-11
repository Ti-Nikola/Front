import { getContractor } from '@/api/contractor/getContractor';
import { getStaff } from '@/api/staff/getStaff';
import { Contractor } from '@/types/Contractor';
import { OptionsArray } from '@/types/Generic';
import { Staff } from '@/types/Staff';

export const fetchTeam = async ({
  setVendors,
  setEngineers,
  setContractors,
}: {
  setVendors: (vendors: OptionsArray) => void;
  setEngineers: (engineers: OptionsArray) => void;
  setContractors: (contractors: OptionsArray) => void;
}) => {
  const staff = await getStaff();
  const contractors = await getContractor();

  const vendors = staff.filter(
    (member) => member.area === 'Comercial' || member.area === 'Gerencia'
  );
  const engineers = staff.filter((member) => member.area === 'Operaciones');

  const mappedVendors = vendors.map((member: Staff) => ({
    label: member.nombre_completo,
    value: member.id,
  }));
  const mappedEngineers = engineers.map((member: Staff) => ({
    label: member.nombre_completo,
    value: member.id,
  }));
  const mappedContractors = contractors.map((contractor: Contractor) => ({
    label: contractor.nombre,
    value: contractor.id,
  }));

  console.log(mappedVendors);

  setVendors(mappedVendors);
  setEngineers(mappedEngineers);
  setContractors(mappedContractors);
};
