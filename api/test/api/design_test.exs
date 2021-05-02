defmodule Api.DashboardTest do
  use Api.DataCase

  alias Api.Dashboard

  describe "members" do
    alias Api.Dashboard.Member

    @valid_attrs %{owner: true, read_only: true}
    @update_attrs %{owner: false, read_only: false}
    @invalid_attrs %{owner: nil, read_only: nil}

    def member_fixture(attrs \\ %{}) do
      {:ok, member} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Dashboard.create_member()

      member
    end

    test "list_members/0 returns all members" do
      member = member_fixture()
      assert Dashboard.list_members() == [member]
    end

    test "get_member!/1 returns the member with given id" do
      member = member_fixture()
      assert Dashboard.get_member!(member.id) == member
    end

    test "create_member/1 with valid data creates a member" do
      assert {:ok, %Member{} = member} = Dashboard.create_member(@valid_attrs)
      assert member.owner == true
      assert member.read_only == true
    end

    test "create_member/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Dashboard.create_member(@invalid_attrs)
    end

    test "update_member/2 with valid data updates the member" do
      member = member_fixture()
      assert {:ok, %Member{} = member} = Dashboard.update_member(member, @update_attrs)
      assert member.owner == false
      assert member.read_only == false
    end

    test "update_member/2 with invalid data returns error changeset" do
      member = member_fixture()
      assert {:error, %Ecto.Changeset{}} = Dashboard.update_member(member, @invalid_attrs)
      assert member == Dashboard.get_member!(member.id)
    end

    test "delete_member/1 deletes the member" do
      member = member_fixture()
      assert {:ok, %Member{}} = Dashboard.delete_member(member)
      assert_raise Ecto.NoResultsError, fn -> Dashboard.get_member!(member.id) end
    end

    test "change_member/1 returns a member changeset" do
      member = member_fixture()
      assert %Ecto.Changeset{} = Dashboard.change_member(member)
    end
  end

  describe "documents" do
    alias Api.Dashboard.Document

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def document_fixture(attrs \\ %{}) do
      {:ok, document} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Dashboard.create_document()

      document
    end

    test "list_documents/0 returns all documents" do
      document = document_fixture()
      assert Dashboard.list_documents() == [document]
    end

    test "get_document!/1 returns the document with given id" do
      document = document_fixture()
      assert Dashboard.get_document!(document.id) == document
    end

    test "create_document/1 with valid data creates a document" do
      assert {:ok, %Document{} = document} = Dashboard.create_document(@valid_attrs)
    end

    test "create_document/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Dashboard.create_document(@invalid_attrs)
    end

    test "update_document/2 with valid data updates the document" do
      document = document_fixture()
      assert {:ok, %Document{} = document} = Dashboard.update_document(document, @update_attrs)
    end

    test "update_document/2 with invalid data returns error changeset" do
      document = document_fixture()
      assert {:error, %Ecto.Changeset{}} = Dashboard.update_document(document, @invalid_attrs)
      assert document == Dashboard.get_document!(document.id)
    end

    test "delete_document/1 deletes the document" do
      document = document_fixture()
      assert {:ok, %Document{}} = Dashboard.delete_document(document)
      assert_raise Ecto.NoResultsError, fn -> Dashboard.get_document!(document.id) end
    end

    test "change_document/1 returns a document changeset" do
      document = document_fixture()
      assert %Ecto.Changeset{} = Dashboard.change_document(document)
    end
  end

  describe "shapes" do
    alias Api.Design.Shape

    @valid_attrs %{height: 42, width: 42, x_position: 42, y_position: 42}
    @update_attrs %{height: 43, width: 43, x_position: 43, y_position: 43}
    @invalid_attrs %{height: nil, width: nil, x_position: nil, y_position: nil}

    def shape_fixture(attrs \\ %{}) do
      {:ok, shape} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Design.create_shape()

      shape
    end

    test "list_shapes/0 returns all shapes" do
      shape = shape_fixture()
      assert Design.list_shapes() == [shape]
    end

    test "get_shape!/1 returns the shape with given id" do
      shape = shape_fixture()
      assert Design.get_shape!(shape.id) == shape
    end

    test "create_shape/1 with valid data creates a shape" do
      assert {:ok, %Shape{} = shape} = Design.create_shape(@valid_attrs)
      assert shape.height == 42
      assert shape.width == 42
      assert shape.x_position == 42
      assert shape.y_position == 42
    end

    test "create_shape/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Design.create_shape(@invalid_attrs)
    end

    test "update_shape/2 with valid data updates the shape" do
      shape = shape_fixture()
      assert {:ok, %Shape{} = shape} = Design.update_shape(shape, @update_attrs)
      assert shape.height == 43
      assert shape.width == 43
      assert shape.x_position == 43
      assert shape.y_position == 43
    end

    test "update_shape/2 with invalid data returns error changeset" do
      shape = shape_fixture()
      assert {:error, %Ecto.Changeset{}} = Design.update_shape(shape, @invalid_attrs)
      assert shape == Design.get_shape!(shape.id)
    end

    test "delete_shape/1 deletes the shape" do
      shape = shape_fixture()
      assert {:ok, %Shape{}} = Design.delete_shape(shape)
      assert_raise Ecto.NoResultsError, fn -> Design.get_shape!(shape.id) end
    end

    test "change_shape/1 returns a shape changeset" do
      shape = shape_fixture()
      assert %Ecto.Changeset{} = Design.change_shape(shape)
    end
  end
end
