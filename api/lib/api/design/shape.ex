defmodule Api.Design.Shape do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:document_id, :height, :width, :x_position, :y_position]}

  schema "shapes" do
    field :height, :integer
    field :width, :integer
    field :x_position, :integer
    field :y_position, :integer
    field :document_id, :id

    timestamps()
  end

  @doc false
  def changeset(shape, attrs) do
    shape
    |> cast(attrs, [:height, :width, :x_position, :y_position, :document_id])
    |> validate_required([:height, :width, :x_position, :y_position, :document_id])
  end
end
