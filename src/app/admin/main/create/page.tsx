
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import React, { useActionState, useState } from "react"
import UploadExample from "@/components/UploadExample"
import { createMenuAction } from "../../../../../action/create-menu"

type Props = {
  item?: {
    id: string
    name: string
    description: string
    price: number
    category: string
    imageUrl: string
  }
}

const category = [
  "Breakfast",
  "Snacks",
  "Starters",
  "Main Course",
  "Pizza",
  "Burger",
  "Pasta",
  "Salad",
  "Dessert",
  "Beverages",
]

const Create = ({ item }: Props) => {
  const [formState, formAction, isPending] = useActionState(
    createMenuAction,
    { errors: {} }
  )

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [jsonFile, setJsonFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(item?.category || null)

  const handleAction = (formData: FormData) => {
    formData.append("image", imageUrl || "")
    return formAction(formData)
  }

  const handleJsonImport = async () => {
    if (!jsonFile) {
      alert("Please select a JSON file")
      return
    }

    try {
      setImporting(true)

      const text = await jsonFile.text()
      const items = JSON.parse(text)

      const response = await fetch("/api/admin/menu/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(`${result.count} menu items imported successfully`)
        setJsonFile(null)
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert("Invalid JSON file")
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-screen w-full p-5">

      <Card className="w-96 h-fit">
        <CardHeader>
          <CardTitle className="flex items-center justify-between mb-3">
            <h2 className="font-bold">Add New Menu Items</h2>

            <Link
              className="bg-black px-2 py-1.5 cursor-pointer text-white rounded-md"
              href="/admin/main/"
            >
              All Items
            </Link>
          </CardTitle>

          <form action={handleAction}>

            {item && (
              <input
                type="hidden"
                name="id"
                value={item.id}
              />
            )}

            <div>
              <label htmlFor="item-name">
                <h3>Item Name:</h3>

                <input
                  type="text"
                  id="item-name"
                  name="name"
                  placeholder="Enter Item Name"
                  defaultValue={item?.name || ""}
                  className="border border-black rounded-md px-2 py-1.5 w-full mt-1.5"
                />
              </label>
            </div>

            <div>
              <label htmlFor="item-desc">
                <h3>Item Description:</h3>

                <input
                  type="text"
                  id="item-desc"
                  name="description"
                  placeholder="Enter Item Description"
                  defaultValue={item?.description || ""}
                  className="border border-black rounded-md px-2 py-1.5 w-full mt-1.5"
                />
              </label>
            </div>

            <div>
              <label htmlFor="item-price">
                <h3>Item Price:</h3>

                <input
                  type="number"
                  id="item-price"
                  name="price"
                  placeholder="Enter Item Price"
                  defaultValue={item?.price || ""}
                  className="border border-black rounded-md px-2 py-1.5 w-full mt-1.5"
                />
              </label>
            </div>

            <div>
              <label htmlFor="item-category">
                <h3>Item Category:</h3>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full mt-1.5">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {category.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>

                  <input
                    type="hidden"
                    name="category"
                    value={selectedCategory ?? ""}
                  />
                </Select>
              </label>
            </div>

            <UploadExample setImageUrl={setImageUrl} />

            <Button
              type="submit"
              className="mt-5 rounded-sm w-full"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Add Menu Item"}
            </Button>

          </form>
        </CardHeader>
      </Card>

      <Card className="w-96 h-fit">
        <CardHeader>
          <CardTitle className="font-bold mb-3">
            Import Multiple Menu Items
          </CardTitle>

          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              setJsonFile(e.target.files?.[0] || null)
            }}
            className="w-full"
          />

          <Button
            type="button"
            className="mt-3 w-full"
            onClick={handleJsonImport}
            disabled={!jsonFile || importing}
          >
            {importing ? "Importing..." : "Import JSON"}
          </Button>
        </CardHeader>
      </Card>

    </div>
  )
}

export default Create

