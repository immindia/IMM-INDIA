"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Form validation schema
const formSchema = z.object({
  fullname: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .regex(/^[A-Za-z ]+$/, {
      message: "Name can only contain letters and spaces.",
    }),
  contact: z.string().regex(/^[6-9][0-9]{9}$/, {
    message: "Please enter a valid 10-digit contact number starting with 6, 7, 8, or 9.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(2, {
    message: "Please enter your city.",
  }),
  completed12th: z.enum(["yes", "no"], {
    required_error: "Please select an option.",
  }),
})

const EnquiryForm = ({ toggleForm, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMarksheetUpload, setShowMarksheetUpload] = useState(false)
  const [isEligible, setIsEligible] = useState(true)
  const [file, setFile] = useState(null)

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      contact: "",
      email: "",
      address: "",
      completed12th: undefined,
    },
  })

  // Handle form submission
  const onSubmit = async (values) => {
    setIsSubmitting(true)

    // Create FormData for file upload
    const formData = new FormData()
    formData.append("fullname", values.fullname)
    formData.append("contact", values.contact)
    formData.append("email", values.email)
    formData.append("address", values.address)
    formData.append("course", "BBA")
    formData.append("completed12th", values.completed12th)

    // Only append file if one exists
    if (file) {
      formData.append("file", file)
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form and show success message
      form.reset()
      setFile(null)
      setShowMarksheetUpload(false)
      onSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle eligibility change
  const handleEligibilityChange = (value) => {
    if (value === "yes") {
      setShowMarksheetUpload(true)
      setIsEligible(true)
    } else {
      setShowMarksheetUpload(false)
      setIsEligible(false)
      alert("Sorry, you are not eligible.")
    }
  }

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Card className="bg-white text-foreground shadow-xl border-0">
      <CardHeader className="bg-blue-700 text-white rounded-t-lg">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-center sm:text-xl font-bold">Register for Admission 2025-2028</CardTitle>
          <button onClick={toggleForm} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <CardDescription className="text-blue-100  text-sm sm:text-base">Fill the form below to start your application</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter Contact Number"
                      maxLength={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mb-4">
              <Input value="BBA" readOnly className="bg-gray-50" />
            </div>

            <FormField
              control={form.control}
              name="completed12th"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have minimum 50% score in 10th and 12th?</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleEligibilityChange(value)
                    }}
                    value={field.value}
                    disabled={!isEligible && field.value === "no"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Yes or No" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showMarksheetUpload && (
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">Upload your 12th Marksheet</label>
                <Input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileChange}
                  disabled={!isEligible}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800"
              disabled={isSubmitting || !isEligible}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EnquiryForm
