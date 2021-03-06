class MachineDeleteJob < BaseJob
  self.set_max_attempts 10, 15.seconds

  def perform meta_machine_id
    machine = MetaMachine.find meta_machine_id
    machine.destroy
    new_machine = NewMachine.find_by_given_meta_machine_id meta_machine_id
    new_machine.destroy if new_machine
  end
end
