defmodule Api.Repo.Migrations.CreateComponents do
  use Ecto.Migration

  def change do
    create table(:components) do
      add :parent_id, :integer
      add :height, :integer
      add :width, :integer
      add :position_x, :integer
      add :position_y, :integer
      add :filled, :boolean
      add :rounded, :integer
      add :align_horizontal, :string, default: "start"
      add :align_vertical, :string, default: "start"
      add :document_id, references(:documents, on_delete: :nothing)

      timestamps()
    end

    create index(:components, [:document_id])
  end
end
